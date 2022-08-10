using BusinessLayer.Data;
using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Repositories
{
    public class ReservationRepository : GenericRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(ApplicationDbContext dbContext)
                       : base(dbContext)
        {
        }

        public IEnumerable<Reservation> GetReservationsOfAUser(int userId)
        {
            return this.DbContext.Reservations.Where((x) => x.UserId == userId && x.StartDate.Day >= DateTime.Today.Day).Include(x => x.Location).Include(x => x.Car);
        }

        public int GetTotalNumberOfReservationsForLocation(int locationId)
        {
            return this.DbContext.Reservations.Count((x) => x.LocationId == locationId && x.EndDate >= DateTime.Now);
        }

        public bool CheckUserReservation(int? userId, int locationId)
        {
            return this.DbContext.Reservations.Any((r) => r.LocationId == locationId && r.UserId == userId && DateTime.Now <= r.EndDate && DateTime.Now >= r.StartDate);
        }

        public void DeleteReservationById(int id)
        {
            var enitityToBeDeleted = this.DbContext.Reservations.FirstOrDefault(x => x.Id == id);
            if (enitityToBeDeleted != null)
            {
                this.DbContext.Reservations.Remove(enitityToBeDeleted);
                DbContext.SaveChanges();
            }
        }

        public void DeleteAllReservationsOfCar(int carId)
        {
            var reservationsToBeDeleted = this.DbContext.Reservations.Where(x => x.CarId == carId);
            if (reservationsToBeDeleted != null)
            {
                this.DbContext.Reservations.RemoveRange(reservationsToBeDeleted);
                this.DbContext.SaveChanges();
            }
        }

        public DateTime ExtractDateInRightFormat(DateTime date, int hour)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0).AddHours(hour);
        }

        public ValidationResult ValidateProcessedReservation(Reservation reservation, Location location)
        {
            var errors = new List<string>();
            if (!this.CheckIntervalValid(reservation, location))
            {
                errors.Add("Time interval not completely free for the specified period.");

            }

            if (this.HasCarOtherReservation(reservation))
            {
                errors.Add("The car is already asssigned to another reservation during the specified period of time. Please check My Reservation section.");
            }
            return new ValidationResult { IsValid = !errors.Any(), Errors = errors }; ;
        }

        private bool CheckIntervalValid(Reservation reservation, Location location)
        {
            DateTime begin = reservation.StartDate;

            while (begin < reservation.EndDate)
            {
                if (this.GetReservationNumberOnLocationByInterval(begin, begin.AddHours(1), location.Id) >= location.NumberOfPlaces)
                {
                    return false;
                }
                begin = begin.AddHours(1);
            }

            return true;
        }

        private bool HasCarOtherReservation(Reservation reservation)
        {
            return this.DbContext.Reservations.Any((x) => x.CarId == reservation.CarId && reservation.StartDate < x.EndDate && reservation.EndDate > x.StartDate);
        }

        private int GetReservationNumberOnLocationByInterval(DateTime start, DateTime end, int locationId)
        {
            return this.DbContext.Reservations.Count((x) => x.LocationId == locationId && start < x.EndDate && end > x.StartDate);
        }
    }
}
