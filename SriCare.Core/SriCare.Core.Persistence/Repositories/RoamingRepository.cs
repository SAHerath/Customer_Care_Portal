using Microsoft.EntityFrameworkCore;
using SriCare.Core.Application.Interfaces;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Persistence.Repositories;

internal class RoamingRepository(CoreDBContext dbContext) : Repository<Roaming>(dbContext), IRoamingRepository
{
    public async Task<Roaming> GetByUserIdAsync(Guid id) => await dbSet.Include(r => r.RoamingPlans).FirstOrDefaultAsync(r => r.UserId == id);
}