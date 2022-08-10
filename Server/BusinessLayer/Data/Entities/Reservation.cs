using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;


namespace BusinessLayer.Data.Entities
{
    public class Reservation
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public int UserId { get; set; }

        [DataMember]
        [Required]
        public int CarId { get; set; }

        [DataMember]
        [Required]
        public DateTime StartDate { get; set; }

        [DataMember]
        [Required]
        public DateTime EndDate { get; set; }

        [DataMember]
        [Required]
        public int LocationId { get; set; }

        public Location Location { get; set; }

        public Car Car { get; set; }

        public User User { get; set; }
    }
}
