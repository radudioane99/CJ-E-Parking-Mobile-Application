using BusinessLayer.Data.Entities;
using BusinessLayer.Models;
using System.Collections.Generic;

namespace BusinessLayer.Interfaces
{
    public interface ILocationRepository : IGenericRepository<Location>
    {
        IList<LocationModel> GetLocations();
    }
}
