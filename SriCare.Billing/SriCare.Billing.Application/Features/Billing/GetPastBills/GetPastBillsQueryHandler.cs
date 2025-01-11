using MediatR;
using Microsoft.Extensions.Logging;
using SriCare.Billing.Domain.Enum;

namespace SriCare.Billing.Application.Features.Billing.GetPastBills
{
    public class GetPastBillsQueryHandler(ILogger<GetPastBillsQueryHandler> logger) : IRequestHandler<GetPastBillsQuery, GetPastBillsDto>
    {
        private readonly ILogger<GetPastBillsQueryHandler> logger = logger;

        private static readonly List<PastBillDto> Bills = new()
        {
            new PastBillDto() { BillId = "BILL001",  Amount = 2500.00, DueDate = new DateTime(2024, 12, 15), PaidDate = new DateTime(2024, 12, 12), Status = BillStatus.Paid},
            new PastBillDto()  { BillId = "BILL002",  Amount = 2700.00, DueDate = new DateTime(2024, 11, 15), PaidDate = new DateTime(2024, 11, 10), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL003", Amount = 2300.00, DueDate = new DateTime(2024, 10, 15), PaidDate = new DateTime(2024, 10, 12), Status = BillStatus.Paid },
            new PastBillDto()  { BillId = "BILL004",  Amount = 2800.00, DueDate = new DateTime(2024, 09, 15), PaidDate = new DateTime(2024, 09, 13), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL005",  Amount = 2600.00, DueDate = new DateTime(2024, 08, 15), PaidDate = new DateTime(2024, 08, 12), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL006",  Amount = 2450.00, DueDate = new DateTime(2024, 07, 15), PaidDate = new DateTime(2024, 07, 10), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL007",  Amount = 2900.00, DueDate = new DateTime(2024, 06, 15), PaidDate = new DateTime(2024, 06, 13), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL008",  Amount = 3000.00, DueDate = new DateTime(2024, 05, 15), PaidDate = new DateTime(2024, 05, 11), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL009",  Amount = 3200.00, DueDate = new DateTime(2024, 04, 15), PaidDate = new DateTime(2024, 04, 10), Status = BillStatus.Paid },
            new PastBillDto() { BillId = "BILL010",  Amount = 2500.00, DueDate = new DateTime(2024, 03, 15), PaidDate = new DateTime(2024, 03, 12), Status = BillStatus.Paid }
        };

        public async Task<GetPastBillsDto> Handle(GetPastBillsQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation( $"Calling GetPastBillsQueryHandler mock function for user {request.UserId}" );
            return await Task.Run(() => new GetPastBillsDto { UserId = request.UserId, PastBills = Bills });
        }
    }
}