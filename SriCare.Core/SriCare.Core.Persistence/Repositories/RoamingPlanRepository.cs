using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SriCare.Core.Application.Interfaces;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Persistence.Repositories
{
    internal class RoamingPlanRepository(CoreDBContext dbContext) : Repository<RoamingPlan>(dbContext), IRoamingPlanRepository
    {
    }
}