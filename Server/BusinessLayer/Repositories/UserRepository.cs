using BusinessLayer.Data;
using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;

namespace BusinessLayer.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext dbContext)
                        : base(dbContext)
        {

        }

        public User Login(string email, string password)
        {
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
            {
                var user = this.GetUserByEmail(email);
                if (user != null && string.Equals(password, user.Password))
                {
                    return user;
                }
            }
            return null;
        }

        public User GetUserByEmail(string email)
        {
            return base.Get().FirstOrDefault(x => string.Equals(email, x.Email));
        }

        public bool IsEmailValid(string email)
        {
            try
            {
                MailAddress m = new MailAddress(email);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        public ValidationResult ValidateNewUser(User user)
        {
            var errors = new List<string>();
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
            {
                errors.Add("Email, password, first name and last name are required.");

            }
            if (this.GetUserByEmail(user.Email) != null)
            {
                errors.Add("User already exists.");
            }
            if (!this.IsEmailValid(user.Email))
            {
                errors.Add("Email is not valid.");
            }
            if (user.Password.Length < 8)
            {
                errors.Add("Invalid password! Please make sure it has at least 8 characters");
            }
            return new ValidationResult { IsValid = !errors.Any(), Errors = errors }; ;
        }

        public ValidationResult ValidateEditUser(UserEditModel user, User dbUser)
        {
            var errors = new List<string>();
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
            {
                errors.Add("Email, password, first name and last name are required.");

            }
            if (!string.Equals(dbUser.Email, user.Email) && this.GetUserByEmail(user.Email) != null)
            {
                errors.Add("User with this email already exists.");
            }
            if (!this.IsEmailValid(user.Email))
            {
                errors.Add("Email is not valid.");
            }
            if (!string.IsNullOrEmpty(user.NewPassword) && user.NewPassword.Length < 8)
            {
                errors.Add("Invalid password! Please make sure it has at least 8 characters");
            }
            return new ValidationResult { IsValid = !errors.Any(), Errors = errors }; ;
        }

        public ValidationResult ValidatePasswordChange(PasswordRequest passwordRequest)
        {
            var errors = new List<string>();
            if (this.GetUserByEmail(passwordRequest.Email) == null)
            {
                errors.Add("Unexpected error occured.Make sure that email is correct!");

            }

            if (!string.Equals(passwordRequest.ConfrirmPassword, passwordRequest.NewPassword))
            {
                errors.Add("Passwords do not match!");
            }

            if (passwordRequest.NewPassword.Length < 8)
            {
                errors.Add("Password must have at least 8 characters!");
            }

            return new ValidationResult { IsValid = !errors.Any(), Errors = errors }; ;
        }

        public User EditUser(UserEditModel userEdit, User dbUser)
        {
            dbUser.Email = userEdit.Email;
            dbUser.FirstName = userEdit.FirstName;
            dbUser.LastName = userEdit.LastName;
            if (!string.IsNullOrEmpty(userEdit.NewPassword))
            {
                dbUser.Password = userEdit.NewPassword;
            }

            this.DbContext.SaveChanges();
            return dbUser;
        }

        public void ChangePassword(string email)
        {
            var dbUser = this.GetUserByEmail(email);
            dbUser.NeedValidation = false;
            if (!string.IsNullOrEmpty(email))
            {
                dbUser.Password = dbUser.RequestedPassword;
                dbUser.RequestedPassword = null;
            }

            this.DbContext.SaveChanges();
        }

        public void RequestPasswordChange(string email, string newpassword)
        {
            var dbUser = this.GetUserByEmail(email);
            dbUser.NeedValidation = true;
            dbUser.RequestedPassword = newpassword;
            this.DbContext.SaveChanges();
        }
    }
}
