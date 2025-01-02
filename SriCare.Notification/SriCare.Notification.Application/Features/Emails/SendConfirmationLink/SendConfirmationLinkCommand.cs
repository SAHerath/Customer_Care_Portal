using MediatR;

namespace SriCare.Notification.Application.Features.Emails.SendConfirmationLink
{
    public class SendConfirmationLinkCommand :IRequest
    {
        public string Email { get; set; }
        public string ConfirmationLink { get; set; }
    }
}