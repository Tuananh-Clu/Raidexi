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
        public string PasswordResetTemplate(string name, string link)
        {

            return $@"
<html>
<body style='margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;'>
    <table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 0;background-color:#f5f5f5;'>
        <tr>
            <td align='center'>
                <table width='600' cellpadding='0' cellspacing='0'
                       style='background:#ffffff;border-radius:8px;padding:40px;'>

                    <tr>
                        <td align='center'>
                            <h2 style='margin:0;color:#202124;'>
                                Reset Your Password
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td style='padding-top:20px;color:#5f6368;font-size:16px;line-height:24px;'>
                            Hi {name},
                            <br/><br/>
                            We received a request to reset the password for your Raidexi account.
                            Click the button below to create a new password.
                        </td>
                        <a href='{link}' style='display:none;'>Reset Password Link</a>
                    </tr>

                    <tr>
                        <td align='center' style='padding:30px 0;'>
                            <a href='{link}'
                               style='background:#1a73e8;
                                      color:#ffffff;
                                      text-decoration:none;
                                      padding:14px 32px;
                                      border-radius:4px;
                                      display:inline-block;
                                      font-weight:bold;'>
                                Reset Password
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style='color:#5f6368;font-size:14px;line-height:22px;'>
                            This link will expire in 15 minutes for security reasons.
                            <br/><br/>
                            If you didn't request a password reset, you can safely ignore this email.
                        </td>
                    </tr>

                    <tr>
                        <td style='padding-top:30px;border-top:1px solid #e0e0e0;color:#9aa0a6;font-size:12px;'>
                            Best regards,<br/>
                            The Raidexi Team
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>";


        }
    }
}
