

using SriCare.Billing.Domain.Enum;

namespace SriCare.Billing.Application.Features.Billing.GetCurrentBill
{
    public class GetCurrentBillDto
    {
        public Guid UserId { get; set; }
        public string BillId { get; set; }
        public double Amount { get; set; }
        public DateTime DueDate { get; set; }
        public BillStatus Status { get; set; }
    }
}