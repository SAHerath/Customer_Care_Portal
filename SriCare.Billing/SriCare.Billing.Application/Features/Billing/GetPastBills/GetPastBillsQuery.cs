using MediatR;

namespace SriCare.Billing.Application.Features.Billing.GetPastBills
{
    public class GetPastBillsQuery : IRequest<GetPastBillsDto>
    {
        public Guid UserId { get; set; }
    }
}