namespace SriCare.Billing.Application.Features.Billing.PayBill
{
    public class TransactionDto
    {
        public string TransactionId { get; set; }
        public double Amount { get; set; }
        public string Method { get; set; }
        public Guid UserId { get; set; }
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }
    }
}