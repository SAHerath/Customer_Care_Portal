using Common.Utils.Account;
using Common.Utils.Messages.Billing;
using MediatR;
using Microsoft.Extensions.Logging;
using SriCare.Billing.Application.interfaces;

namespace SriCare.Billing.Application.Features.Billing.GenerateBill
{
    public class GenerateBillCommandHandler(ILogger<GenerateBillCommandHandler> logger, IUserIdentity user, INotificationQueueClient client) : IRequestHandler<GenerateBillCommand>
    {
        private readonly ILogger<GenerateBillCommandHandler> logger = logger;
        private readonly IUserIdentity user = user;
        private readonly INotificationQueueClient client = client;

        public async Task Handle(GenerateBillCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation( $"Calling GenerateBillCommand mock function for user {request.UserId}" );

            var report = await Task.Run(() => new BillingReport {
                BillId = Guid.NewGuid(),
                UserName = user.UserName,
                Email = user.Email,
                Amount = new Random().Next(1000, 5000),
                DueDate = DateTime.UtcNow.AddDays(30),
                Status = "pending"
            });

            client.SendMessage(report);
        }
    }
}