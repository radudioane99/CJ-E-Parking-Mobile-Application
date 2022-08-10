namespace BusinessLayer.Models
{
    public class PasswordRequest
    {
        public string Email { get; set; }

        public string NewPassword { get; set; }

        public string ConfrirmPassword { get; set; }
    }
}
