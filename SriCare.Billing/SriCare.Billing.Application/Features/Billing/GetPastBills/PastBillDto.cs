using SriCare.Billing.Domain.Enum;

namespace SriCare.Billing.Application.Features.Billing.GetPastBills
{
    public class PastBillDto
    {
        public string BillId { get; set; }
        public double Amount { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime PaidDate { get; set; }
        public BillStatus Status { get; set; }
    }
}