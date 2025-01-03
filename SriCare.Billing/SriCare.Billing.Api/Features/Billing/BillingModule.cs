using Carter;

namespace SriCare.Billing.Api.Features.Billing
{
    public class BillingModule : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/currentBill",  () => {
                return Results.Ok("this is test endpoint");
            }).WithOpenApi();
        }
    }
}