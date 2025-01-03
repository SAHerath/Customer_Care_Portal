using MediatR;

namespace SriCare.Billing.Application.Features.Billing.GenerateBill
{
    public class GenerateBillCommand : IRequest
    {
        public Guid UserId { get; set; }
    }
}