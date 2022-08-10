using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Data.Entities
{
    public class Car
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        [Required]
        public string RegistrationNumber { get; set; }

        [DataMember]
        [Required]
        public string Manufacturer { get; set; }

        [DataMember]
        [Required]
        public string Model { get; set; }

        [DataMember]
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
