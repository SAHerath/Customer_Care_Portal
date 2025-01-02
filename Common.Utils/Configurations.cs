using Common.Utils.Account;
using Microsoft.Extensions.DependencyInjection;

namespace Common.Utils;

public static class Configurations
    {
        public static IServiceCollection AddCommonUtilsConfigurations(this IServiceCollection services)
        {
            services.AddScoped<IUserIdentity, UserIdentity>();
            return services;
        }
    }