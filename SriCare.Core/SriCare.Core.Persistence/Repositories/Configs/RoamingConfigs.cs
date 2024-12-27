using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Persistence.Repositories.Configs;

internal class RoamingConfigs : IEntityTypeConfiguration<Roaming>
{
    public void Configure(EntityTypeBuilder<Roaming> builder)
    {
        builder.ToTable("Roaming");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.UserId).IsUnique();
        builder.HasMany(x => x.RoamingPlans).WithOne(x => x.Roaming).HasForeignKey(x => x.RoamingId);
    }
}