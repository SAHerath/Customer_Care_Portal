using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Application.Interfaces;

public interface IRoamingRepository:IRepository<Roaming>
{
     Task<Roaming> GetByUserIdAsync(Guid id);
}