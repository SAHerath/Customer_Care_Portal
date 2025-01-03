using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using SriCare.Notification.Application.Interfaces;

namespace SriCare.Notification.Application.Features.Emails.SendBillingReport
{
    public class SendBillingReportCommandHandler(INotificationMailSender client, ILogger<SendBillingReportCommandHandler> logger) : IRequestHandler<SendBillingReportCommand>
    {
        private readonly ILogger<SendBillingReportCommandHandler> logger = logger;
        protected readonly INotificationMailSender client = client;

        public async Task Handle(SendBillingReportCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();


            var body = $"Hi <b>{request.UserName}</b>, <br> Please find your e-Bill herewith."
                + "<br> <br>"
                + $"<b>Bill Id</b> - {request.BillId}<br>"
                + $"<b>Amount</b> - Rs. {request.Amount}<br>"
                + $"<b>Due date</b> - {request.DueDate}<br>"
                + $"<b>Current payment state</b> - {request.Status}";

            logger.LogInformation("Sending Email to {Email}", request.Email);
            await client.SendEmail(request.Email, $"SriCare - Monthly Bill Report ({request.DueDate})", body);
        }
    }
}