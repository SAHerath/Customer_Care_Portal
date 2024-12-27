using SriCare.Core.Domain.Interfaces;

namespace SriCare.Core.Domain.Roaming;

public class Roaming : ITraceEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public bool Activate { get; set; }
    public string CreatedBy { get; set; }
    public DateTimeOffset CreatedDateTime { get; set; }
    public string ModifiedBy { get; set; }
    public DateTimeOffset? ModifiedDateTime { get; set; }

    public virtual IEnumerable<RoamingPlan> RoamingPlans{ get; set; }
}