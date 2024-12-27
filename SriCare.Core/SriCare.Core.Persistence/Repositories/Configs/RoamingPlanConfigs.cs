using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Persistence.Repositories.Configs;

internal class RoamingPlanConfigs : IEntityTypeConfiguration<RoamingPlan>
{
    public void Configure(EntityTypeBuilder<RoamingPlan> builder)
    {
        builder.HasKey(x => x.Id);
    }
}