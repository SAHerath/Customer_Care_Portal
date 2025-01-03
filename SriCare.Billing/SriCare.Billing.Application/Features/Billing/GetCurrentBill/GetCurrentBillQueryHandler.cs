using MediatR;
using Microsoft.Extensions.Logging;
using SriCare.Billing.Domain.Enum;

namespace SriCare.Billing.Application.Features.Billing.GetCurrentBill
{
    public class GetCurrentBillQueryHandler(ILogger<GetCurrentBillQueryHandler> logger) : IRequestHandler<GetCurrentBillQuery, GetCurrentBillDto>
    {
        private readonly ILogger<GetCurrentBillQueryHandler> logger = logger;

        public async Task<GetCurrentBillDto> Handle(GetCurrentBillQuery request, CancellationToken cancellationToken)
        {

            logger.LogInformation( $"Calling GetCurrentBill mock function for user {request.UserId}" );
            return  await Task.Run(() => new GetCurrentBillDto 
                                                { 
                                                    UserId = request.UserId, 
                                                    BillId = "BILL101",
                                                    Amount = 2500, 
                                                    DueDate = DateTime.UtcNow.AddDays(15), 
                                                    Status = BillStatus.Pending 
                                                });
        }
    }
}