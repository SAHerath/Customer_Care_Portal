using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SriCare.Notification.Application.Interfaces;
using SriCare.Notification.Infra.MailService;

namespace SriCare.Notification.Infra;

public static class Configurations
{
        public static void AddInfraConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddTransient<INotificationMailSender, NotificationMailSender>();
        }
}
