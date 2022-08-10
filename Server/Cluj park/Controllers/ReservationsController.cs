using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Collections.Generic;

namespace Cluj_park.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationsController : ODataController
    {
        private readonly IReservationRepository reservationRepository;
        private readonly ILocationRepository locationRepository;
        private readonly ICarRepository carRepository;

        public ReservationsController(IReservationRepository reservationRepository, ILocationRepository locationRepository, ICarRepository carRepository)
        {
            this.reservationRepository = reservationRepository;
            this.locationRepository = locationRepository;
            this.carRepository = carRepository;
        }

        [HttpGet("{userId}")]
        public IEnumerable<Reservation> Get(int userId)
        {
            return this.reservationRepository.GetReservationsOfAUser(userId);
        }

        [HttpGet("HasUserReservation/{carNumber}/{locationId}")]
        public ActionResult<bool> HasUserReservation(string carNumber, int locationId)
        {
            var userId = this.carRepository.GetUserIdWithCarNumber(carNumber);
            if (userId == 0 || userId == null)
            {
                return this.BadRequest("Car not found in the system.");
            }
            return this.reservationRepository.CheckUserReservation(userId, locationId);
        }

        [HttpPost("addReservation")]
        public ActionResult Post([FromBody] ReservationModel reservation)
        {
            if (reservation == null || reservation.CarId == 0 || reservation.UserId == 0)
            {
                return this.BadRequest("Server error.");
            }

            var startDate = this.reservationRepository.ExtractDateInRightFormat(reservation.StartDate, reservation.StartHour);
            var endDate = this.reservationRepository.ExtractDateInRightFormat(reservation.EndDate, reservation.EndHour);
            if (startDate > endDate)
            {
                return this.BadRequest("End date should be before start date.");
            }
            Reservation finalReservation = new Reservation { Id = reservation.Id, CarId = reservation.CarId, LocationId = reservation.LocationId, EndDate = endDate, StartDate = startDate, UserId = reservation.UserId };
            var location = this.locationRepository.Get(reservation.LocationId);
            var validateArgumentResult = this.reservationRepository.ValidateProcessedReservation(finalReservation, location);
            if (validateArgumentResult.IsValid)
            {
                this.reservationRepository.Create(finalReservation);
            }
            else
            {
                return this.BadRequest(validateArgumentResult.Errors);
            }


            return this.Ok(reservation);

        }

        [HttpDelete("cancelReservation/{reservationId}")]
        public ActionResult CancelReservation(int reservationId)
        {
            this.reservationRepository.DeleteReservationById(reservationId);
            return this.Ok();
        }
    }
}
