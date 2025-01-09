using System.Net;
using Carter;
using Common.Utils.Account;
using Common.Utils.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SriCare.Billing.Application.Features.Billing.GenerateBill;
using SriCare.Billing.Application.Features.Billing.GetCurrentBill;
using SriCare.Billing.Application.Features.Billing.GetPastBills;
using SriCare.Billing.Application.Features.Billing.GetPaymentHistory;
using SriCare.Billing.Application.Features.Billing.PayBill;

namespace SriCare.Billing.Api.Features.Billing
{
    public class BillingModule : CarterModule
    {
        public BillingModule()
        {
            this.RequireAuthorization();
            this.IncludeInOpenApi();
        }

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/current-bill",  async (ISender sender, IUserIdentity user) => {
                return  Results.Ok( await sender.Send(new GetCurrentBillQuery {UserId = user.Id}));
            })
            .Produces<GetCurrentBillDto>((int)HttpStatusCode.OK)
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest);


            app.MapGet("/past-bills", async(ISender sender, IUserIdentity user) => {
                return Results.Ok(await sender.Send(new GetPastBillsQuery {UserId = user.Id}));
            })
            .Produces<GetPastBillsDto>((int)HttpStatusCode.OK)
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest);


            app.MapGet("/payment-history", async(ISender sender, IUserIdentity user) => {
                return Results.Ok(await sender.Send(new GetPaymentHistoryQuery {UserId = user.Id}));
            })
            .Produces<GetPaymentHistoryListDto>((int)HttpStatusCode.OK)
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest);

            app.MapPost("/generate-bill", async(ISender sender) => {
                var command = new GenerateBillCommand();
                await sender.Send(command);
                return Results.Ok();
            })
            .Produces((int)HttpStatusCode.OK)
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest);

            app.MapPost("/pay-bill", async ( [FromBody] PayBillRequestDto command, ISender sender,IUserIdentity user) => 
            {
                return Results.Ok( await sender.Send(new PayBillCommand { UserId = user.Id, Amount = command.Amount, Method = command.Method}));
            })
            .Produces<PayBillCommandResponse>((int)HttpStatusCode.OK)
            .Produces<ErrorModel>((int)HttpStatusCode.BadRequest);
        }
    }
}