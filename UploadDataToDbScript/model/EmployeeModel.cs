

namespace UploadDataToDbScript.model
{
    public class EmployeeModel
    {
        public required Guid RowID { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }

        public required string LastName { get; set; }
        public required Guid ParentRowID { get; set; }

    }
}
