using BusinessLayer.Data.Entities;
using BusinessLayer.Models;

namespace BusinessLayer.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User Login(string email, string password);

        User GetUserByEmail(string email);

        ValidationResult ValidateNewUser(User user);

        bool IsEmailValid(string email);

        User EditUser(UserEditModel userEdit, User dbUser);

        ValidationResult ValidateEditUser(UserEditModel user, User dbUser);

        void ChangePassword(string email);

        void RequestPasswordChange(string email, string newpassword);

        ValidationResult ValidatePasswordChange(PasswordRequest passwordRequest);

    }
}
