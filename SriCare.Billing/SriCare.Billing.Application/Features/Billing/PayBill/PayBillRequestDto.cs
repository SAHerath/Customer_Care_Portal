namespace SriCare.Billing.Application.Features.Billing.PayBill
{
    public class PayBillRequestDto
    {
        public double Amount { get; set; }
        public string Method { get; set; }
    }
}