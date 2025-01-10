using System.Threading.RateLimiting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http.Resilience;
using Polly;
using Refit;
using SriCare.Billing.Application.interfaces;
using SriCare.Billing.Infrastructure.Services;

namespace SriCare.Billing.Infrastructure;

public static class Configurations
{
    public static void AddInfrastructureConfigurations(this IServiceCollection services)
    {
        services.AddSingleton<INotificationQueueClient, NotificationQueueClient> ();
        services.AddRefitClient<IPaymentClient>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://paymentService"))
            .AddResilienceHandler("CustomResilience", resilienceBuilder =>{
                resilienceBuilder.AddRetry(new HttpRetryStrategyOptions {
                    MaxRetryAttempts = 5,
                    Delay = TimeSpan.FromSeconds(1),
                    BackoffType = DelayBackoffType.Exponential,
                    UseJitter = true,
                    ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                        .Handle<Exception>()
                        .HandleResult(response => !response.IsSuccessStatusCode)
                });

                // resilienceBuilder.AddTimeout(TimeSpan.FromSeconds(3));

                resilienceBuilder.AddCircuitBreaker(new HttpCircuitBreakerStrategyOptions{
                    SamplingDuration = TimeSpan.FromSeconds(10),
                    FailureRatio = 0.2,
                    MinimumThroughput = 3,
                    BreakDuration = TimeSpan.FromSeconds(60),
                    ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                        .Handle<Exception>()
                        .HandleResult(response => !response.IsSuccessStatusCode)
                });
            });

        services.AddResiliencePipeline("rateLimiter", builder => {
            builder.AddRateLimiter(new SlidingWindowRateLimiter(
                new SlidingWindowRateLimiterOptions
                {
                    SegmentsPerWindow = 5,
                    PermitLimit = 5,
                    Window = TimeSpan.FromSeconds(30)
                }));

            
        });
    }
}
