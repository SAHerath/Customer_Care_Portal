using SriCare.Core.Domain.Enums;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Domain.ActivePlans
{
    public class ActivePlan
    {
        public Guid Id { get; set; }
        public string PlanName { get; set; }
        public PlanType Type { get; set; }
        public double Price { get; set; }
        public DateTime Validity { get; set; }
        public int SMSQuota { get; set; }
        public int CallQuota { get; set; }
        public int DataQuota { get; set; }

        public virtual IEnumerable<RoamingPlan> RoamingPlans{ get; set; }
    }
}