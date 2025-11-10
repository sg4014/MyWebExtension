

using CsvHelper;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Globalization;
using UploadDataToDbScript;
using UploadDataToDbScript.model;


var serverURL = System.Configuration.ConfigurationManager.AppSettings["DVUrl"];
var username = System.Configuration.ConfigurationManager.AppSettings["Username"];
var password = System.Configuration.ConfigurationManager.AppSettings["Password"];

var sessionManager = SessionManager.CreateInstance();
sessionManager.Connect(serverURL, String.Empty, username, password);

UserSession? session = null;
try
{
    session = sessionManager.CreateSession();
    var context = CreateContext(session);
    var staffSvc = context.GetService<IStaffService>();

    // Добавляем группы как дочерние подразделения Самсон/Внештатный персонал/
    var parentUnit = staffSvc.GetDepartment(new Guid("8e65381b-6a81-4e7f-9efb-6b0cfaa8d738"));
    Dictionary<string, StaffUnit> createdUnits = CreateUnits(parentUnit, context);
    context.AcceptChanges();

    // Читаем информацию о сотрудниках и наблюдаемых ими городах
    using var reader = new StreamReader(@"C:\Users\serge\Source\Repos\MyWebExtension\UploadDataToDbScript\data_for_import.csv");
    using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

    List<CityObserversRowModel> cityObserversRows = new(1000);
    List<EmployeeModel> employees = new(10000);

    int employeeCount = 0;

    while (csv.Read())
    {
        string groupName = csv.GetField(0)!.Split(@"\")[2];
        var unit = createdUnits[groupName];

        string employeeFullName = csv.GetField(1)!;
        string[] employeeNames = employeeFullName.Trim().Split(' ');

        var employee = new EmployeeModel
        {
            RowID = Guid.NewGuid(),
            FirstName = employeeNames[0],
            MiddleName = employeeNames[1],
            LastName = employeeNames[2],
            ParentRowID = createdUnits[groupName].GetObjectId(),
        };

        employees.Add(employee);
        employeeCount++;
        Console.WriteLine($"Employees added: {employeeCount}");

        // Создаем модели для строк таблицы dvtable_city_observers и сохраняем в список,
        // чтобы потом добавить их одним sql запросом.
        List<string> observedCities = csv.GetField(3)
            .Split(" ")
            .Where(s => s.EndsWith("да"))
            .Select(s => s.Substring(0, s.IndexOf(":")))
            .ToList();

        foreach (var cityName in observedCities)
        {
            cityObserversRows.Add(new CityObserversRowModel
            {
                EmployeeID = employee.RowID,
                CityID = GetCityID(cityName)
            });
        }
    }

    // NB! Port=2345 because the database is remote and we use port forwarding to connect to it 
    // (2345 on host maps to 5432 on server)
    var connectionString = "Host=127.0.0.1;Port=2345;Database=docsvision;Username=postgres;Password=postgres";
    var dataAccess = new DataAccess(connectionString);
    dataAccess.OpenConnection();

    Console.WriteLine("Starting to insert employees...");
    dataAccess.AddEmployeesBatch(employees);
    Console.WriteLine("Finished inserting employees.");

    Console.WriteLine("Starting to insert city observers...");
    dataAccess.AddObserversBatch(cityObserversRows);
    Console.WriteLine("Finished inserting city observers.");

    dataAccess.UpdateStaffDirectoryChangeDateTime();

    Console.WriteLine("ChangeDateTime updated. Press any key to continue...");
    Console.ReadKey();
}
finally
{
    session?.Close();
}

static Guid GetCityID(string cityName) => cityName.ToLower() switch
{
    "москва" => new Guid("3e1c3f4d-3f74-42e0-8138-fb25b352a9f3"),
    "санкт-петербург" => new Guid("b1c5a3e7-e21e-4f11-8cd7-9f518b0e5542"),
    "самара" => new Guid("4ad3f8ae-00fc-4a29-8bd0-e40a32b21552"),
    _ => throw new ArgumentException($"Unexpected city name: {cityName}")
};

static ObjectContext CreateContext(UserSession session) => ContextFactory.CreateContext(session);


// Возвращает список названий групп из csv файла
static List<string> GetGroupNames()
{
    List<string> groupNames = new(100);
    using var reader = new StreamReader(@"C:\Users\serge\Source\Repos\MyWebExtension\UploadDataToDbScript\data_for_import.csv");
    using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

    while (csv.Read())
    {
        var groupName = csv.GetField(0)?.Split(@"\")[2];
        if (!string.IsNullOrWhiteSpace(groupName)
            && !groupNames.Contains(groupName))
        {
            groupNames.Add(groupName);
        }
    }

    return groupNames;
}

// Добавляет в базу данных взятые из csv файла дочерние подразделения для parentUnit
// и возвращает список добавленных подразделений
static Dictionary<string, StaffUnit> CreateUnits(StaffUnit parentUnit, ObjectContext context)
{
    var groupNames = GetGroupNames();

    var staffSvc = context.GetService<IStaffService>();
    Dictionary<string, StaffUnit> createdUnits = new();

    foreach (var groupName in groupNames)
    {
        var unit = staffSvc.AddNewUnit(parentUnit);
        unit.Type = StaffUnitType.Department;
        unit.Name = groupName;
        createdUnits.Add(groupName, unit);
        context.SaveObject(unit);
    }

    return createdUnits;
}