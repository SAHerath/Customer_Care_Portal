using Microsoft.Extensions.DependencyInjection;
using SriCare.Billing.Application.interfaces;
using SriCare.Billing.Infrastructure.Services;

namespace SriCare.Billing.Infrastructure;

public static class Configurations
{
    public static void AddInfrastructureConfigurations(this IServiceCollection services)
    {
        services.AddSingleton<INotificationQueueClient, NotificationQueueClient> ();
    }
}
