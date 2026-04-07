using MailKit.Security;
using MimeKit;
using Raidexi.Application.Dtos;
using Raidexi.Application.Interfaces;

namespace Raidexi.Infrastructure.Services
{
    public class MailService : IMailServicecs
    {
        public async Task SendMailAsync(SendMailRequest sendMailRequest)
        {
            ArgumentNullException.ThrowIfNull(sendMailRequest);

            if (string.IsNullOrWhiteSpace(sendMailRequest.To))
            {
                throw new ArgumentException("Recipient email is required.", nameof(sendMailRequest));
            }

            if (string.IsNullOrWhiteSpace(sendMailRequest.Subject))
            {
                throw new ArgumentException("Mail subject is required.", nameof(sendMailRequest));
            }

            if (string.IsNullOrWhiteSpace(sendMailRequest.Html))
            {
                throw new ArgumentException("Mail content is required.", nameof(sendMailRequest));
            }

            var mailAccount = Environment.GetEnvironmentVariable("MailAdmin");
            var password = Environment.GetEnvironmentVariable("MailAdminPassword");

            if (string.IsNullOrWhiteSpace(mailAccount) || string.IsNullOrWhiteSpace(password))
            {
                throw new InvalidOperationException("Mail credentials are not configured.");
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Raidexi", mailAccount));
            message.To.Add(MailboxAddress.Parse(sendMailRequest.To));
            message.Subject = sendMailRequest.Subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = sendMailRequest.Html
            };

            if (sendMailRequest.Attachment is not null)
            {
                if (string.IsNullOrWhiteSpace(sendMailRequest.Attachment.FileName) ||
                    string.IsNullOrWhiteSpace(sendMailRequest.Attachment.Base64))
                {
                    throw new ArgumentException(
                        "Attachment file name and content are required when sending an attachment.",
                        nameof(sendMailRequest));
                }

                var attachmentMimeType = string.IsNullOrWhiteSpace(sendMailRequest.Attachment.MimeType)
                    ? "application/octet-stream"
                    : sendMailRequest.Attachment.MimeType;

                var attachmentBytes = Convert.FromBase64String(sendMailRequest.Attachment.Base64);
                bodyBuilder.Attachments.Add(
                    sendMailRequest.Attachment.FileName,
                    attachmentBytes,
                    ContentType.Parse(attachmentMimeType));
            }

            message.Body = bodyBuilder.ToMessageBody();

            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();
            await smtpClient.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await smtpClient.AuthenticateAsync(mailAccount, password);
            await smtpClient.SendAsync(message);
            await smtpClient.DisconnectAsync(true);
        }

        public string EmailTemplate(string name, string link)
        {
            return $@"
                <html>
                    <body>
                        <p>Hi {name},</p>
                        <p>Thank you for signing up for Raidexi! Please click the link below to verify your email address:</p>
                        <a href='{link}'>Verify Email</a>
                        <p>If you did not sign up for Raidexi, please ignore this email.</p>
                        <p>Best regards,<br/>The Raidexi Team</p>
                    </body>
                </html>
            ";
        }
    }
}
