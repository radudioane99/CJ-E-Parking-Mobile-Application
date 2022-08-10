using BusinessLayer.Data;
using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Repositories
{
    public class CarRepository : GenericRepository<Car>, ICarRepository
    {
        public CarRepository(ApplicationDbContext dbContext)
                       : base(dbContext)
        {
        }

        public IEnumerable<Car> GetCarsOfUser(int userId)
        {
            return this.DbContext.Cars.Where(car => car.UserId == userId);
        }

        public int? GetUserIdWithCarNumber(string carNumber)
        {
            return this.DbContext.Cars.FirstOrDefault(x => string.Equals(x.RegistrationNumber, carNumber) == true)?.UserId;
        }
    }
}
