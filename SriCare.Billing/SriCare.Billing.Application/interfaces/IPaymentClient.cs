using Refit;
using SriCare.Billing.Application.Features.Billing.PayBill;

namespace SriCare.Billing.Application.interfaces
{
    // [Headers("accept: application/json", "Authorization: Bearer")]
    public interface IPaymentClient
    {
        [Post("/process")]
        Task<PayBillCommandResponse> PayBillAsync([Authorize(scheme: "Bearer")] string token, PayBillCommand request);
    }
}