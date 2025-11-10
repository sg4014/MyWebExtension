using DocumentFormat.OpenXml.Bibliography;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UploadDataToDbScript.model;

namespace UploadDataToDbScript
{
    public class DataAccess
    {
        private readonly NpgsqlConnection _connection;

        public DataAccess(string connectionString)
        {
            _connection = new NpgsqlConnection(connectionString);
        }

        public void OpenConnection()
        {
            _connection.Open();
        }

        public void AddObserver(Guid employeeId, Guid cityId)
        {
            const string sql = """
                
                INSERT INTO "dvtable_city_observers" ("EmployeeID", "cityID")
                VALUES (@employeeId, @cityId)
                ON CONFLICT DO NOTHING;
                
                """;

            using var cmd = new NpgsqlCommand(sql, _connection);
            cmd.Parameters.AddWithValue("employeeId", employeeId);
            cmd.Parameters.AddWithValue("cityId", cityId);
            cmd.ExecuteNonQueryAsync();
        }

        public async Task AddObserversBatchAsync(List<CityObserversRowModel> cityObserversRows)
        {
            if (cityObserversRows == null || cityObserversRows.Count == 0)
                return;

            const string copyCommand = """
            COPY "dvtable_city_observers" ("EmployeeID", "CityID")
            FROM STDIN (FORMAT BINARY);
            """;

            using var writer = await _connection.BeginBinaryImportAsync(copyCommand);

            foreach (var row in cityObserversRows)
            {
                await writer.StartRowAsync();
                await writer.WriteAsync(row.EmployeeID, NpgsqlTypes.NpgsqlDbType.Uuid);
                await writer.WriteAsync(row.CityID, NpgsqlTypes.NpgsqlDbType.Uuid);
            }

            await writer.CompleteAsync();
        }

        public void AddEmployeesBatch(List<EmployeeModel> employees)
        {
            if (employees == null || employees.Count == 0)
                return;

            var SDID = new Guid("c63daae3-c51b-4879-9dbd-d78e8b7e7f8e");
            const string employeesTable = "dvtable_{dbc8ae9d-c1d2-4d5e-978b-339d22b32482}";

            const string copyCommand = $"""
            COPY "{employeesTable}" ("RowID", "ParentRowID", "SDID", "FirstName", "MiddleName", "LastName")
            FROM STDIN (FORMAT BINARY);
            """;

            using var writer =  _connection.BeginBinaryImport(copyCommand);

            foreach (var e in employees)
            {
                writer.StartRow();
                writer.Write(e.RowID, NpgsqlTypes.NpgsqlDbType.Uuid);
                writer.Write(e.ParentRowID, NpgsqlTypes.NpgsqlDbType.Uuid);
                writer.Write(SDID, NpgsqlTypes.NpgsqlDbType.Uuid);
                writer.Write(e.FirstName, NpgsqlTypes.NpgsqlDbType.Text);
                writer.Write(e.MiddleName, NpgsqlTypes.NpgsqlDbType.Text);
                writer.Write(e.LastName, NpgsqlTypes.NpgsqlDbType.Text);
            }

            writer.Complete();
        }

        // Обновить время изменения Справочника сотрудников 
        public void UpdateStaffDirectoryChangeDateTime()
        {
            const string sql = """
                update "dvsys_instances_date"
                set "ChangeDateTime" = now()
                where "InstanceID" = '6710b92a-e148-4363-8a6f-1aa0eb18936c'::uuid;
                """;

            using var cmd = new NpgsqlCommand(sql, _connection);
            cmd.ExecuteNonQuery();
        }
    }
}
