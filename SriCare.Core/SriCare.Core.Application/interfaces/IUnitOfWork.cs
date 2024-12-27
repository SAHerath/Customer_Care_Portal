namespace SriCare.Core.Application.Interfaces;

 public interface IUnitOfWork
 {
    public IRoamingRepository Roaming { get; }
    void Save();
    Task SaveAsync();
 }