using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using Cluj_park.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cluj_park.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ODataController
    {
        private readonly ILocationRepository locationRepository;
        private readonly IReservationRepository reservationRepository;
        private readonly IHubContext<ParkHub> parkHub;

        public LocationsController(ILocationRepository locationRepository, IReservationRepository reservationRepository, IHubContext<ParkHub> parkHub)
        {
            this.locationRepository = locationRepository;
            this.reservationRepository = reservationRepository;
            this.parkHub = parkHub;
        }

        [HttpGet]
        public IList<LocationModel> Get()
        {
            return this.locationRepository.GetLocations();
        }

        [HttpGet("GetNumber/{number}")]
        public async Task<IActionResult> GetRandom(int number)
        {
            var location = this.locationRepository.Get(2);
            var updatedNumber = location.HardwareCalculatedNumberOfPlaces + number;
            if (updatedNumber >= 0 && updatedNumber <= location.NumberOfPlaces)
            {
                location.HardwareCalculatedNumberOfPlaces = updatedNumber;
                await parkHub.Clients.All.SendAsync("number", updatedNumber);

                this.locationRepository.Update(location);
            }

            return this.Ok();
        }

        [HttpGet("GetNumberByCategory/{category}")]
        public async Task<IActionResult> GetNumberByCategory(int number)
        {
            var location = this.locationRepository.Get(2);
            var updatedNumber = location.HardwareCalculatedNumberOfPlaces + number;
            if (updatedNumber >= 0 && updatedNumber <= location.NumberOfPlaces)
            {
                location.HardwareCalculatedNumberOfPlaces = updatedNumber;
                await parkHub.Clients.All.SendAsync("number", updatedNumber);

                this.locationRepository.Update(location);
            }

            return this.Ok();
        }
    }
}
