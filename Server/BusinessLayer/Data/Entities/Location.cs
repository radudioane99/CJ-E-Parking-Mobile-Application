using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace BusinessLayer.Data.Entities
{
    public class Location
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        [Required]
        public int NumberOfPlaces { get; set; }

        [DataMember]
        public string Adress { get; set; }

        [DataMember]
        public int? HardwareCalculatedNumberOfPlaces { get; set; }

    }
}
