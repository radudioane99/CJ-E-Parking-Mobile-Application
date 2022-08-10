namespace BusinessLayer.Models
{
    public class UserEditModel
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
