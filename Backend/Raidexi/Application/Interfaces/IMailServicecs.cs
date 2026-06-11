using Raidexi.Application.Dtos;

namespace Raidexi.Application.Interfaces
{
    public interface IMailServicecs
    {
        Task SendMailAsync(SendMailRequest sendMailRequest);
        string EmailTemplate(string email, string link);
        string PasswordResetTemplate(string name, string link);
    }
}
