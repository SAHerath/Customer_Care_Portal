namespace SriCare.Billing.Application.Features.Billing.PayBill
{
    public class PayBillCommandResponse
    {
        public string Status { get; set; }
        public TransactionDto Transaction { get; set; }
    }
}