using System.Text.Json.Serialization;
using SriCare.Core.Domain.ActivePlans;

namespace SriCare.Core.Domain.Roaming;

public class RoamingPlan{
    public Guid Id { get; set; }
    public Guid RoamingId { get; set; }
    public Guid  ActivePlanId { get; set; }
    public string PlanName { get; set; }
    public double Price { get; set; }
    public DateTime Validity { get; set; }
    public int SMSQuota { get; set; }
    public int CallQuota { get; set; }
    public int DataQuota { get; set; }

    public virtual Roaming Roaming{ get; set; }

    public virtual ActivePlan Plan{ get; set; }
}