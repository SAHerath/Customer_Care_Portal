namespace SriCare.Core.Application.Features.Roaming.GetRoamingByUserId
{
    public class RoamingPlanDto
    {
        public Guid Id { get; set; }
        public Guid RoamingId { get; set; }
        public Guid  ActivePlanId { get; set; }
        public string PlanName { get; set; }
        public double Price { get; set; }
        public DateTime Validity { get; set; }
        public int SMSQuota { get; set; }
        public int CallQuota { get; set; }
        public int DataQuota { get; set; }
    }
}