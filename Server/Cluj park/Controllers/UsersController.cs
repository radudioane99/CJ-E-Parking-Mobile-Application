using BusinessLayer.Data.Entities;
using BusinessLayer.Interfaces;
using BusinessLayer.Models;
using BusinessLayer.Services;
using Cluj_park.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Cluj_park.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ODataController
    {
        private readonly IUserRepository userRepository;
        private readonly IMailService mailService;


        public UsersController(IUserRepository userRepository, IMailService mailService)
        {
            this.userRepository = userRepository;
            this.mailService = mailService;
        }

        [HttpPost("{email}/{password}")]
        public ActionResult<User> Login(string email, string password)
        {
            var user = this.userRepository.Login(email, password);
            if (user != null)
            {
                return this.Ok(user);
            }
            else
            {
                return this.BadRequest("Invalid Email or password.");
            }

        }

        [HttpPost("signUp")]
        public ActionResult<User> SignUp([FromBody] SignUpModel signUp)
        {
            if (signUp == null)
            {
                return this.BadRequest("Server internal error.");
            }

            User user = new User
            {
                Email = signUp.Email,
                Password = signUp.Password,
                FirstName = signUp.FirstName,
                LastName = signUp.LastName
            };

            var validateArgumentResult = this.userRepository.ValidateNewUser(user);

            if (validateArgumentResult.IsValid)
            {
                this.userRepository.Create(user);
                MailRequest mailRequest = new MailRequest();
                var message = this.mailService.ReadEmailTextFromFile("Welcome.txt");
                mailRequest.Subject = "Welcome";
                //For testing only
                mailRequest.ToEmail = "dioaneradu@gmail.com";
                this.mailService.SendEmailAsync(mailRequest, message, "");
                return this.Ok(user);
            }
            else
            {
                return this.BadRequest(validateArgumentResult.Errors);
            }
        }

        [HttpPost("RecoverPassword")]
        public ActionResult RecoverPassword([FromBody] PasswordRequest passwordRequest)
        {
            var validateArgumentResult = this.userRepository.ValidatePasswordChange(passwordRequest);
            if (validateArgumentResult.IsValid)
            {
                this.userRepository.RequestPasswordChange(passwordRequest.Email, passwordRequest.NewPassword);
                MailRequest mailRequest = new MailRequest();
                var message = this.mailService.ReadEmailTextFromFile("ChangePasswordEmailTemplate.txt");
                mailRequest.Subject = "Reset passowrd";
                //For testing only
                mailRequest.ToEmail = "dioaneradu@gmail.com";
                this.mailService.SendEmailAsync(mailRequest, message, passwordRequest.Email);
                return Ok();
            }

            return this.BadRequest(validateArgumentResult.Errors);

        }

        [HttpGet("ConfirmChangePassword/{email}")]
        public string ConfirmChangePassword(string email)
        {
            this.userRepository.ChangePassword(email);
            return "Password reset successfully. Log in in the application with the new password.";

        }

        [HttpPut("EditProfile")]
        public ActionResult<User> EditProfile(UserEditModel userEditModel)
        {
            var dbUser = this.userRepository.Get(userEditModel.Id);
            if (string.IsNullOrEmpty(userEditModel.NewPassword) || string.Equals(dbUser.Password, userEditModel.OldPassword))
            {
                var validateArgumentResult = this.userRepository.ValidateEditUser(userEditModel, dbUser);
                if (validateArgumentResult.IsValid)
                {
                    var newUser = this.userRepository.EditUser(userEditModel, dbUser);
                    MailRequest mailRequest = new MailRequest();
                    mailRequest.Subject = "Edit Acount";
                    var message = this.mailService.ReadEmailTextFromFile("EditedUserEmailTemplate.txt");
                    //For testing only
                    mailRequest.ToEmail = "dioaneradu@gmail.com";
                    this.mailService.SendEmailAsync(mailRequest, message, "");
                    return Ok(newUser);
                }
                else
                {
                    return this.BadRequest(validateArgumentResult.Errors);
                }
            }
            else
            {
                return this.BadRequest("The current password is not correct!");
            }
        }
    }
}
