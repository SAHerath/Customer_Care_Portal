using Microsoft.Extensions.DependencyInjection;
using SriCare.Core.Application.Interfaces;

namespace SriCare.Core.Persistence;

public static class Configurations
{
    public static IServiceCollection AddEFConfigurations(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;
    }
}