using SriCare.Core.Application.Interfaces;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Persistence.Repositories;

internal class RoamingRepository : Repository<Roaming>, IRoamingRepository
    {


        public RoamingRepository(CoreDBContext dbContext) : base(dbContext)
        {

        }

    }