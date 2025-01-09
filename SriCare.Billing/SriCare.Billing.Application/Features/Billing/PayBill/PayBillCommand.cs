using System.Text.Json.Serialization;
using MediatR;

namespace SriCare.Billing.Application.Features.Billing.PayBill
{
    public class PayBillCommand : IRequest<PayBillCommandResponse>
    {
        public double Amount { get; set; }
        public string Method { get; set; }
        public Guid UserId { get; set; }
    }
}