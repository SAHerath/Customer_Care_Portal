using SriCare.Billing.Application.Features.Billing.GetCurrentBill;

namespace SriCare.Billing.Api.MediatR
{
    internal static class MediatRConfiguration
    {
        public static void AddMediatRConfiguration(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetCurrentBillQueryHandler).Assembly));
        }
    }
}