using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Application.Features.Roaming.GetRoamingByUserId;

public class RoamingDto {
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public bool Activate { get; set; }
    public List<RoamingPlanDto> ActivatedPlans { get; set; }
}