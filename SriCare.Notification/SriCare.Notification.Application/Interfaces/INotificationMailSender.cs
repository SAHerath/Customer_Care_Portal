namespace SriCare.Notification.Application.Interfaces
{
    public interface INotificationMailSender
    {
        Task SendConfirmationLinkAsync(string email, string confirmationLink);
        Task SendPasswordResetLinkAsync(string email, string passwordResetLink);
    }
}