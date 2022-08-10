
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace BusinessLayer.Data.Entities
{
    [DataContract]
    public class User
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Email { get; set; }

        [DataMember]
        [Required]
        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [DataMember]
        [Required]
        public bool NeedValidation { get; set; }

        [DataMember]
        public string RequestedPassword { get; set; }

        [DataMember]
        public bool HasTheRightToSubmitReports { get; set; }


    }
}
