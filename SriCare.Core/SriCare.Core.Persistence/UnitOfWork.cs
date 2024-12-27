using SriCare.Core.Application.Interfaces;
using SriCare.Core.Persistence.Repositories;

namespace SriCare.Core.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly CoreDBContext dbContext;
        private IRoamingRepository roaming = null;

        public UnitOfWork(CoreDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IRoamingRepository Roaming => roaming ??= new RoamingRepository(dbContext);

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await dbContext.SaveChangesAsync();
        }
}