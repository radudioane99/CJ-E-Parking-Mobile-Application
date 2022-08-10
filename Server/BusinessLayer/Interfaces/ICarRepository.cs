using BusinessLayer.Data.Entities;
using System.Collections.Generic;

namespace BusinessLayer.Interfaces
{
    public interface ICarRepository : IGenericRepository<Car>
    {
        IEnumerable<Car> GetCarsOfUser(int userId);

        int? GetUserIdWithCarNumber(string carNumber);
    }
}
