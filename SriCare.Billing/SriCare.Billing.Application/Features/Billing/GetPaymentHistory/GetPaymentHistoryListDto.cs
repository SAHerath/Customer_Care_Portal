namespace SriCare.Billing.Application.Features.Billing.GetPaymentHistory
{
    public class GetPaymentHistoryListDto
    {
        public Guid UserId { get; set; }
        public List<PaymentHistoryDto>? PaymentsHistory { get; set; }
    }
}