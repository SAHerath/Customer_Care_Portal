using SriCare.Notification.Application.Interfaces;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;

namespace SriCare.Notification.Infra.MailService
{
    public class NotificationMailSender(IOptions<EmailSettings> emailSettings, ILogger<NotificationMailSender> logger) : INotificationMailSender
    {
        private readonly EmailSettings emailSettings = emailSettings.Value;
        private readonly ILogger<NotificationMailSender> logger = logger;

        public async Task SendConfirmationLinkAsync(string email, string confirmationLink)
        {
            var emailMsg = new MimeMessage();
            emailMsg.From.Add(new MailboxAddress(emailSettings.SenderName, emailSettings.SenderEmail));
            emailMsg.To.Add(new MailboxAddress("",email));
            emailMsg.Subject = "Account Confirmation";
            emailMsg.Body = new TextPart(MimeKit.Text.TextFormat.Html){Text = $"<b>Click following link to verify your email account</b><br><br> {confirmationLink}"};

            using var smtpClient = new SmtpClient();

            try
            {
                await smtpClient.ConnectAsync(emailSettings.SmtpServer, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                await smtpClient.AuthenticateAsync(emailSettings.Username, emailSettings.Password);
                await smtpClient.SendAsync(emailMsg);
            }catch(Exception ex)
            {
                logger.LogError(ex.Message);
                throw;
            }finally
            {
                await smtpClient.DisconnectAsync(true);
            }

        }

        public async Task SendEmail(string email, string subject, string body)
        {
            var emailMsg = new MimeMessage();
            emailMsg.From.Add(new MailboxAddress(emailSettings.SenderName, emailSettings.SenderEmail));
            emailMsg.To.Add(new MailboxAddress("",email));
            emailMsg.Subject = subject;
            emailMsg.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                                {
                                    Text = body
                                };

            using var smtpClient = new SmtpClient();

            try
            {
                await smtpClient.ConnectAsync(emailSettings.SmtpServer, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                await smtpClient.AuthenticateAsync(emailSettings.Username, emailSettings.Password);
                await smtpClient.SendAsync(emailMsg);
            }catch(Exception ex)
            {
                logger.LogError(ex.Message);
                throw;
            }finally
            {
                await smtpClient.DisconnectAsync(true);
            }
        }

        public async Task SendPasswordResetLinkAsync(string email, string passwordResetLink)
        {
            var emailMsg = new MimeMessage();
            emailMsg.From.Add(new MailboxAddress(emailSettings.SenderName, emailSettings.SenderEmail));
            emailMsg.To.Add(new MailboxAddress("",email));
            emailMsg.Subject = "Password Reset Link";
            emailMsg.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                                {
                                    Text = $"<b>Click following link to reset your account password</b><br><br> {passwordResetLink}"
                                };

            using var smtpClient = new SmtpClient();

            try
            {
                await smtpClient.ConnectAsync(emailSettings.SmtpServer, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                await smtpClient.AuthenticateAsync(emailSettings.Username, emailSettings.Password);
                await smtpClient.SendAsync(emailMsg);
            }catch(Exception ex)
            {
                logger.LogError(ex.Message);
                throw;
            }finally
            {
                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}