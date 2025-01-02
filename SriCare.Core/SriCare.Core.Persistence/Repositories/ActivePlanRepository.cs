using Microsoft.EntityFrameworkCore;
using SriCare.Core.Application.Interfaces;
using SriCare.Core.Domain.ActivePlans;
using SriCare.Core.Domain.Enums;

namespace SriCare.Core.Persistence.Repositories
{
    internal class ActivePlanRepository(CoreDBContext dbContext) : Repository<ActivePlan>(dbContext), IActivePlanRepository
    {
        public async Task<IEnumerable<ActivePlan>> FilterActivePlans(PlanType? type)
        {
            if(type == null){
                return await dbSet.ToListAsync();
            }

            return await dbSet.Where(i => i.Type == type).ToListAsync();
        }
    }
}