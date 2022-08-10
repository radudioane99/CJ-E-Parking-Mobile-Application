using BusinessLayer.Data;
using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Repositories
{
    public class LocationRepository : GenericRepository<Location>, ILocationRepository
    {
        public LocationRepository(ApplicationDbContext dbContext)
                       : base(dbContext)
        {
        }

        public IList<LocationModel> GetLocations()
        {
            var locations = this.DbContext.Locations;
            IList<LocationModel> locationModels = new List<LocationModel>();
            foreach (Location location in locations)
            {
                int freeSpaces = location.NumberOfPlaces - this.GetNumberOfFreeSpacesPerLocatiion(location.Id);
                locationModels.Add(new LocationModel { LocationEntity = location, FreeParkPlaces = freeSpaces });
            }

            return locationModels;
        }

        private int GetNumberOfFreeSpacesPerLocatiion(int locationId)
        {
            return this.DbContext.Reservations.Count((x) => x.LocationId == locationId && DateTime.Now < x.EndDate && DateTime.Now.AddHours(1) > x.StartDate);
        }
    }
}
