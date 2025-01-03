using MediatR;

namespace SriCare.Billing.Application.Features.Billing.GetCurrentBill
{
    public class GetCurrentBillQuery :IRequest<GetCurrentBillDto>
    {
        public Guid UserId { get; set; }
    }
}