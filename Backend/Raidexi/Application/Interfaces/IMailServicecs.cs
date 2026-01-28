using Raidexi.Application.Dtos;

namespace Raidexi.Application.Interfaces
{
    public interface IMailServicecs
    {
        Task SendMailAsync(SendMailRequest sendMailRequest);
    }
}
