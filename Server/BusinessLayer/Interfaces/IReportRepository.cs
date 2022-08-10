using BusinessLayer.Data.Entities;
using System.Collections.Generic;

namespace BusinessLayer.Interfaces
{
    public interface IReportRepository : IGenericRepository<Report>
    {
        IEnumerable<Report> GetReportsByUser(int userId);
    }
}
