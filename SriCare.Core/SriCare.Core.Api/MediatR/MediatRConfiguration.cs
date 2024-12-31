using SriCare.Core.Application.Features.Roaming.CreateRoaming;

namespace SriCare.Core.Api.MediatR;

internal static class MediatRConfiguration
{
    public static void AddMediatRConfiguration(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateRoamingCommandHandler).Assembly));
        }
}