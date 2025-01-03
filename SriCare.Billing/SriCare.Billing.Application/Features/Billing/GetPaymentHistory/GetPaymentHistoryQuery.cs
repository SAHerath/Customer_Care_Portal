using MediatR;

namespace SriCare.Billing.Application.Features.Billing.GetPaymentHistory
{
    public class GetPaymentHistoryQuery : IRequest<GetPaymentHistoryListDto>
    {
        public Guid UserId { get; set; }
    }
}