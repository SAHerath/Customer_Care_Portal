using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SriCare.Core.Domain.ActivePlans;

namespace SriCare.Core.Persistence.Repositories.Configs
{
    internal class ActivePlanConfigs : IEntityTypeConfiguration<ActivePlan>
    {
        public void Configure(EntityTypeBuilder<ActivePlan> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}