using SriCare.Notification.Application.Features.Emails.SendConfirmationLink;

namespace SriCare.Notification.Api.MediatR
{
    internal static class MediatRConfiguration
    {
        public static void AddMediatRConfiguration(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(SendConfirmationLinkCommandHandler).Assembly));
        }
    }
}