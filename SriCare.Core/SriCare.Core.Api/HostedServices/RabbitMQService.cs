
using Common.Utils.Messages;
using Common.Utils.Messages.Core;
using MediatR;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using SriCare.Core.Application.Features.Roaming.CreateRoaming;

namespace SriCare.Core.Api.HostedServices;

public class RabbitMQService : IHostedService
{
    private readonly ILogger<RabbitMQService> _logger;
    private readonly IConfiguration _config;
    private readonly IServiceProvider _serviceProvider;
    private IConnection? _messageConnection;
    private IModel? _messageChannel;
 	private EventingBasicConsumer consumer;

    public RabbitMQService(ILogger<RabbitMQService> logger, IConfiguration config, IServiceProvider serviceProvider, IConnection? messageConnection)
    {
        _logger = logger;
        _config = config;
        _serviceProvider = serviceProvider;
    }


    public Task StartAsync(CancellationToken cancellationToken)
    {
        string queueName = "roamingEvents";
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

        if(message.Type == typeof(RoamingMessage).Name){
            var msg = message.Convert<RoamingMessage>();
            var command = new CreateRoamingCommand {
                UserId = msg.UserId,
                Email = msg.Email,
            };

            await mediator.Send(command);
        }
    }
}