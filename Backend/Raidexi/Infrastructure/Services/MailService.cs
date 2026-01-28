using MailKit;
using Raidexi.Application.Dtos;
using MimeKit;
using Raidexi.Application.Interfaces;
namespace Raidexi.Infrastructure.Services
{
    public class MailService : IMailServicecs
    {
        public Task SendMailAsync(SendMailRequest sendMailRequest)
        {
            var message = new MimeKit.MimeMessage();
            message.From.Add(new MailboxAddress("Raidexi", "noreply@raidexi.com"));
            message.To.Add(MailboxAddress.Parse(sendMailRequest.To));
            message.Subject = sendMailRequest.Subject;
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = sendMailRequest.Html
            };
            var attachment = sendMailRequest.Attachment;
            var attachmentBytes = Convert.FromBase64String(attachment.Base64);
            using var kit=new MailKit.Net.Smtp.SmtpClient();
            var mailconfig=Environment.GetEnvironmentVariable("MailAdmin");
            var password=Environment.GetEnvironmentVariable("MailAdminPassword");
            kit.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            kit.Authenticate(mailconfig, password);
            kit.Send(message);
            kit.Disconnect(true);
            return Task.CompletedTask;
        }
    }
}
