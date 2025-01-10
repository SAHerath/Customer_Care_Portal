using Common.Utils.Account;
using Common.Utils.Exceptions;
using Common.Utils.Messages.Billing;
using MediatR;
using Microsoft.Extensions.Logging;
using Polly.Registry;
using SriCare.Billing.Application.interfaces;

namespace SriCare.Billing.Application.Features.Billing.GenerateBill
{
    public class GenerateBillCommandHandler(ILogger<GenerateBillCommandHandler> logger, IUserIdentity user, INotificationQueueClient client, ResiliencePipelineProvider<string> provider) : IRequestHandler<GenerateBillCommand>
    {
        private readonly ILogger<GenerateBillCommandHandler> logger = logger;
        private readonly IUserIdentity user = user;
        private readonly INotificationQueueClient client = client;
        private readonly ResiliencePipelineProvider<string> provider = provider;

        public async Task Handle(GenerateBillCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation( $"Calling GenerateBillCommand mock function for user {request.UserId}" );
            
            try
            {
                var pipeLine = provider.GetPipeline("rateLimiter");
                var report =  await pipeLine.ExecuteAsync(async (ct) => await GenerateReport(ct)) ;

                client.SendMessage(report);
            }
            catch (Exception ex)
            {
                throw new CustomValidationException(new ErrorModel("GetRoamingByUserId", $"Exceed limits {ex.Message}"));
            }
        }

        private async Task<BillingReport> GenerateReport(CancellationToken cancellationToken){
            cancellationToken.ThrowIfCancellationRequested();

            return await Task.Run(() => new BillingReport {
                BillId = Guid.NewGuid(),
                UserName = user.UserName,
                Email = user.Email,
                Amount = new Random().Next(1000, 5000),
                DueDate = DateTime.UtcNow.AddDays(30),
                Status = "pending"
            });
        }
    }
}