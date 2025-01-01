using MediatR;
using Microsoft.Extensions.Logging;
using SriCare.Notification.Application.Interfaces;

namespace SriCare.Notification.Application.Features.Emails.SendConfirmationLink
{
    public class SendConfirmationLinkCommandHandler(INotificationMailSender client, ILogger<SendConfirmationLinkCommandHandler> logger) : IRequestHandler<SendConfirmationLinkCommand>
    {
        private readonly INotificationMailSender client = client;
        private ILogger<SendConfirmationLinkCommandHandler> logger = logger;

        public async Task Handle(SendConfirmationLinkCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            logger.LogInformation("Sending Email confirmation link to {Email}", request.Email);
            await client.SendConfirmationLinkAsync(request.Email,request.ConfirmationLink);
        }
    }
}