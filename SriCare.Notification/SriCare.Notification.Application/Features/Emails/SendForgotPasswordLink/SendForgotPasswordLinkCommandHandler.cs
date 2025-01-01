using MediatR;
using Microsoft.Extensions.Logging;
using SriCare.Notification.Application.Interfaces;

namespace SriCare.Notification.Application.Features.Emails.SendForgotPasswordLink
{
    public class SendForgotPasswordLinkCommandHandler(INotificationMailSender client, ILogger<SendForgotPasswordLinkCommandHandler> logger) : IRequestHandler<SendForgotPasswordLinkCommand>
    {
        private readonly INotificationMailSender client = client;
        private ILogger<SendForgotPasswordLinkCommandHandler> logger = logger;

        public async Task Handle(SendForgotPasswordLinkCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            logger.LogInformation("Sending Password reset link to {Email}", request.Email);
            await client.SendPasswordResetLinkAsync(request.Email,request.ResetLink);
        }
    }
}