using MediatR;
using SriCare.Core.Domain.ActivePlans;
using SriCare.Core.Domain.Enums;

namespace SriCare.Core.Application.Features.Plans.GetActivePlans
{
    public class GetActivePlansQuery : IRequest<IEnumerable<ActivePlan>>
    {
        public PlanType? Type { get; set; }
    }
}