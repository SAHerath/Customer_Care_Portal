using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;

namespace SriCare.Billing.Application.Features.Billing.GetPaymentHistory
{
    public class GetPaymentHistoryQueryHandler(ILogger<GetPaymentHistoryQueryHandler> logger) : IRequestHandler<GetPaymentHistoryQuery, GetPaymentHistoryListDto>
    {
        private readonly ILogger<GetPaymentHistoryQueryHandler> logger = logger;

        private static readonly List<PaymentHistoryDto> Payments = new()
        {
            new PaymentHistoryDto { PaymentId = "PAY001", BillId = "BILL001", Amount = 2500.00, PaymentDate = new DateTime(2024, 12, 12), Method = "creditCard" },
            new PaymentHistoryDto { PaymentId = "PAY002", BillId = "BILL002", Amount = 2700.00, PaymentDate = new DateTime(2024, 11, 10), Method = "debitCard" },
            new PaymentHistoryDto { PaymentId = "PAY003", BillId = "BILL003", Amount = 2300.00, PaymentDate = new DateTime(2024, 10, 12), Method = "UPI" },
            new PaymentHistoryDto { PaymentId = "PAY004", BillId = "BILL004", Amount = 2800.00, PaymentDate = new DateTime(2024, 09, 13), Method = "creditCard" },
            new PaymentHistoryDto { PaymentId = "PAY005", BillId = "BILL005", Amount = 2600.00, PaymentDate = new DateTime(2024, 08, 12), Method = "netBanking" },
            new PaymentHistoryDto { PaymentId = "PAY006", BillId = "BILL006", Amount = 2450.00, PaymentDate = new DateTime(2024, 07, 10), Method = "wallet" },
            new PaymentHistoryDto { PaymentId = "PAY007", BillId = "BILL007", Amount = 2900.00, PaymentDate = new DateTime(2024, 06, 13), Method = "creditCard" },
            new PaymentHistoryDto { PaymentId = "PAY008", BillId = "BILL008", Amount = 3000.00, PaymentDate = new DateTime(2024, 05, 11), Method = "debitCard" },
            new PaymentHistoryDto { PaymentId = "PAY009", BillId = "BILL009", Amount = 3200.00, PaymentDate = new DateTime(2024, 04, 10), Method = "UPI" },
            new PaymentHistoryDto { PaymentId = "PAY010", BillId = "BILL010", Amount = 2500.00, PaymentDate = new DateTime(2024, 03, 12), Method = "creditCard" }
        };

        public async Task<GetPaymentHistoryListDto> Handle(GetPaymentHistoryQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation( $"Calling GetPaymentHistoryQueryHandler mock function for user {request.UserId}" );
            return await Task.Run(() => new GetPaymentHistoryListDto { UserId = request.UserId, PaymentsHistory = Payments });
        }
    }
}