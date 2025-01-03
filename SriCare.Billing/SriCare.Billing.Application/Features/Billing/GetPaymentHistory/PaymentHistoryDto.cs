namespace SriCare.Billing.Application.Features.Billing.GetPaymentHistory
{
    public class PaymentHistoryDto
    {
        public string PaymentId { get; set; }
        public string BillId { get; set; }
        public double Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Method { get; set; }
    }
}