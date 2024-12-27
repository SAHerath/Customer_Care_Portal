using SriCare.Core.Application.Interfaces;
using SriCare.Core.Persistence.Repositories;

namespace SriCare.Core.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly CoreDBContext dbContext;
        private IRoamingRepository roaming = null;
        private IActivePlanRepository activePlans = null;
        private IRoamingPlanRepository roamingPlans = null;

        public UnitOfWork(CoreDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IRoamingRepository Roaming => roaming ??= new RoamingRepository(dbContext);
        public IActivePlanRepository ActivePlans => activePlans ??= new ActivePlanRepository(dbContext);
        public IRoamingPlanRepository RoamingPlans => roamingPlans ??= new RoamingPlanRepository(dbContext);

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await dbContext.SaveChangesAsync();
        }
}