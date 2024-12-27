using SriCare.Core.Domain.ActivePlans;
using SriCare.Core.Domain.Enums;

namespace SriCare.Core.Application.Interfaces
{
    public interface IActivePlanRepository : IRepository<ActivePlan>
    {
        Task<IEnumerable<ActivePlan>> FilterActivePlans(PlanType? type);
    }
}