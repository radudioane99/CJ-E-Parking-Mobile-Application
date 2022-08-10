using System;

namespace BusinessLayer.Models
{
    public class ReservationModel
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int CarId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int LocationId { get; set; }

        public int StartHour { get; set; }

        public int EndHour { get; set; }
    }
}
