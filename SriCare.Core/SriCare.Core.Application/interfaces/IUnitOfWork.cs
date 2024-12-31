namespace SriCare.Core.Application.Interfaces;

 public interface IUnitOfWork
 {
    public IRoamingRepository Roaming { get; }
    public IActivePlanRepository ActivePlans { get; }
    public IRoamingPlanRepository RoamingPlans { get; }
    void Save();
    Task SaveAsync();
 }