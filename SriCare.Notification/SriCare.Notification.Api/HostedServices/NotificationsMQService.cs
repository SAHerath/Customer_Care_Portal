using Common.Utils.Messages;
using Common.Utils.Messages.Auth;
using Common.Utils.Messages.Billing;
using MediatR;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using SriCare.Notification.Application.Features.Emails.SendBillingReport;
using SriCare.Notification.Application.Features.Emails.SendConfirmationLink;
using SriCare.Notification.Application.Features.Emails.SendForgotPasswordLink;

namespace SriCare.Notification.Api.HostedServices
{
    internal class NotificationsMQService :IHostedService
    {
        private readonly ILogger<NotificationsMQService> _logger;
        private readonly IConfiguration _config;
        private readonly IServiceProvider _serviceProvider;
        private IConnection? _messageConnection;
        private IModel? _messageChannel;
        private EventingBasicConsumer consumer;

        public NotificationsMQService(ILogger<NotificationsMQService> logger, IConfiguration config, IServiceProvider serviceProvider, IConnection? messageConnection)
        {
            _logger = logger;
            _config = config;
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            string queueName = "notificationEvents";
            _messageConnection = _serviceProvider.GetRequiredService<IConnection>();
            _messageChannel = _messageConnection.CreateModel();
            _messageChannel.QueueDeclare(queue: queueName,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            consumer = new EventingBasicConsumer(_messageChannel);
            consumer.Received += ProcessMessageAsync;

            _messageChannel.BasicConsume(queue:  queueName,
                autoAck: true, 
                consumer: consumer);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            consumer.Received -= ProcessMessageAsync;
            _messageChannel?.Dispose();
            return Task.CompletedTask;
        }

        private async void ProcessMessageAsync(object? sender, BasicDeliverEventArgs args)
        {
            using var scope = _serviceProvider.CreateScope();
            var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

            var message = MessageBuilder.GetMessage(args.Body.ToArray());

            if(message.Type == typeof(EmailConfirmation).Name){
                var msg = message.Convert<EmailConfirmation>();
                _logger.LogInformation(msg.Email);
                var command = new SendConfirmationLinkCommand {
                    Email = msg.Email,
                    ConfirmationLink = msg.Body
                };

                await mediator.Send(command);
            }

            if(message.Type == typeof(ForgotPassword).Name){
                var msg = message.Convert<ForgotPassword>();
                _logger.LogInformation(msg.Email);
                var command = new SendForgotPasswordLinkCommand {
                    Email = msg.Email,
                    ResetLink = msg.Body
                };

                await mediator.Send(command);
            }

            if(message.Type == typeof(BillingReport).Name)
            {
                var msg = message.Convert<BillingReport>();
                _logger.LogInformation(msg.Email);
                var command = new SendBillingReportCommand {
                    BillId = msg.BillId,
                    UserName = msg.UserName,
                    Email = msg.Email,
                    Amount = msg.Amount,
                    DueDate = msg.DueDate,
                    Status = msg.Status,
                };

                await mediator.Send(command);
            }
        }

    }
}