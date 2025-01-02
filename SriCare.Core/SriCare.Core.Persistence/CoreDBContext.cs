using Microsoft.EntityFrameworkCore;
using SriCare.Core.Domain.ActivePlans;
using SriCare.Core.Domain.Roaming;
using SriCare.Core.Persistence.Repositories.Configs;

namespace SriCare.Core.Persistence;

public class CoreDBContext(DbContextOptions options) : DbContext(options)
{
    public virtual DbSet<Roaming> Roaming { get; set; }
    public virtual DbSet<RoamingPlan> RoamingPlans{ get; set; }
    public virtual DbSet<ActivePlan> ActivePlans{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new RoamingConfigs());
        modelBuilder.ApplyConfiguration(new RoamingPlanConfigs());
        modelBuilder.ApplyConfiguration(new ActivePlanConfigs());
    }
}