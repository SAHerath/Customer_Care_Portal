namespace SriCare.Billing.Application.Features.Billing.GetPastBills
{
    public class GetPastBillsDto
    {
        public Guid UserId { get; set; }
        public List<PastBillDto>? PastBills { get; set; }
    }
}