using Common.Utils.Account;
using MediatR;
using SriCare.Billing.Application.interfaces;

namespace SriCare.Billing.Application.Features.Billing.PayBill
{
    public class PayBillCommandHandler(IPaymentClient client, IUserIdentity user) : IRequestHandler<PayBillCommand, PayBillCommandResponse>
    {

        private readonly IPaymentClient client = client;
        private readonly IUserIdentity userIdentity = user;

        public async Task<PayBillCommandResponse> Handle(PayBillCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            return await client.PayBillAsync(userIdentity.AccessToken, request);
        }
    }
}