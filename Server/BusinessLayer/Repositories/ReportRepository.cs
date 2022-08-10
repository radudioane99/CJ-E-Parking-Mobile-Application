using BusinessLayer.Data;
using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Repositories
{
    public class ReportRepository : GenericRepository<Report>, IReportRepository
    {
        public ReportRepository(ApplicationDbContext dbContext)
                      : base(dbContext)
        {
        }

        public IEnumerable<Report> GetReportsByUser(int userId)
        {
            return base.DbContext.Reports.Where(x => x.UserId == userId).Include(x => x.Location);
        }
    }
}
