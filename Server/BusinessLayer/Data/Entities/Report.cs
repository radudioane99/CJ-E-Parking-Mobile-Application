using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace BusinessLayer.Data.Entities
{
    public class Report
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public int UserId { get; set; }

        [DataMember]
        [Required]
        public int LocationId { get; set; }

        [DataMember]
        [Required]
        public DateTime ReportDate { get; set; }

        [DataMember]
        public bool Verified { get; set; }

        [DataMember]
        public byte[] Image { get; set; }

        public Location Location { get; set; }
    }
}
