using BusinessLayer.Models;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest, string message, string email);

        string ReadEmailTextFromFile(string fileName);
    }
}
