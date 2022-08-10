using BusinessLayer.Data.Entities;
using BusinessLayer.Models;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Interfaces
{
    public interface IReservationRepository : IGenericRepository<Reservation>
    {
        IEnumerable<Reservation> GetReservationsOfAUser(int userId);

        int GetTotalNumberOfReservationsForLocation(int locationId);

        void DeleteReservationById(int id);

        void DeleteAllReservationsOfCar(int carId);

        DateTime ExtractDateInRightFormat(DateTime date, int hour);

        ValidationResult ValidateProcessedReservation(Reservation reservation, Location location);

        bool CheckUserReservation(int? userId, int locationId);

    }
}
