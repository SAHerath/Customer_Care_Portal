using MediatR;

namespace SriCare.Notification.Application.Features.Emails.SendForgotPasswordLink
{
    public class SendForgotPasswordLinkCommand : IRequest
    {
        public string Email { get; set; }
        public string ResetLink { get; set; }
    }
}