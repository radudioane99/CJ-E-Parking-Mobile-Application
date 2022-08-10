using BusinessLayer.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> options)
        {
            _mailSettings = options.Value;
        }

        public string ReadEmailTextFromFile(string fileName)
        {
            try
            {
                using (var sr = new StreamReader("C:\\Users\\dioan\\Desktop\\Licenta Server Repo\\Server\\BusinessLayer\\Services\\EmailTemplates\\" + fileName))
                {
                    var emailText = sr.ReadToEnd();
                    return emailText;
                }
            }
            catch (FileNotFoundException ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }
        public async Task SendEmailAsync(MailRequest mailRequest, string message, string mail)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Email);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.From.Add(new MailboxAddress(_mailSettings.Name, _mailSettings.Email));
            email.Subject = mailRequest.Subject;

            var builder = new BodyBuilder();
            var pathImage = Path.Combine("C:\\Users\\dioan\\Desktop\\Licenta Server Repo\\Server\\BusinessLayer\\Services\\EmailTemplates\\LogoName.png");
            var image = builder.LinkedResources.Add(pathImage);

            image.ContentId = MimeUtils.GenerateMessageId();
            if (string.IsNullOrEmpty(mail))
            {
                builder.HtmlBody = string.Format(message, image.ContentId);
            }
            else
            {
                builder.HtmlBody = string.Format(message, image.ContentId, mail);
            }


            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();

            try
            {
                smtp.Connect(_mailSettings.Host, _mailSettings.Port, true);
                smtp.Authenticate(_mailSettings.Email, _mailSettings.Password);
                await smtp.SendAsync(email);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                smtp.Disconnect(true);
                smtp.Dispose();
            }

        }
    }
}
