using DocsVision.Platform.StorageServer.Extensibility;

namespace MyDVExtension.MyStorageSE;

public class MySE : StorageServerExtension
{
    public MySE() { }

    [ExtensionMethod]
    public int GetApplicationCount(Guid employeeId)
    {
        using (var cmd = DbRequest.DataLayer.Connection.CreateCommand("getApplicationCount", System.Data.CommandType.StoredProcedure))
        {
            cmd.AddParameter("EmployeeId", System.Data.DbType.Guid, System.Data.ParameterDirection.Input, 0, employeeId);
            return int.Parse(cmd.ExecuteScalar<int>() + "");
        }
    }
}
