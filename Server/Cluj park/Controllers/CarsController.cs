using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Collections.Generic;

namespace Cluj_park.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarsController : ODataController
    {
        private readonly IUserRepository userRepository;
        private readonly ICarRepository carRepository;
        private readonly IReservationRepository reservationRepository;


        public CarsController(IUserRepository userRepository, ICarRepository carRepository, IReservationRepository reservationRepository)
        {
            this.userRepository = userRepository;
            this.carRepository = carRepository;
            this.reservationRepository = reservationRepository;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Car car)
        {
            if (car.UserId != 0)
            {
                this.carRepository.Create(car);
                return this.Ok();
            }
            else
            {
                return BadRequest("Server problem occured. Please try to log out and log in again.");
            }

        }

        [HttpGet("{userId}")]
        public IEnumerable<Car> Get(int userId)
        {
            return this.carRepository.GetCarsOfUser(userId);
        }

        [HttpDelete]
        public void Delete([FromBody] Car car)
        {
            this.reservationRepository.DeleteAllReservationsOfCar(car.Id);
            this.carRepository.Delete(car);
        }

        [HttpPut]
        public void Put([FromBody] Car car)
        {
            if (car.Id != 0 && !string.IsNullOrEmpty(car.Manufacturer) && !string.IsNullOrEmpty(car.Model) && !string.IsNullOrEmpty(car.RegistrationNumber) && !string.IsNullOrEmpty(car.Name) && car.UserId != 0)
            {
                this.carRepository.Update(car);
            }

        }

    }
}
