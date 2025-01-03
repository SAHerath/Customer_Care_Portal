namespace Common.Utils.Messages.Billing
{
    public class BillingReport : IMessage
    {
        public Guid BillId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public double Amount { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
    }
}