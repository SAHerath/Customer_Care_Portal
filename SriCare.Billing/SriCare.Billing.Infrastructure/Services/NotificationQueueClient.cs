using Common.Utils.Helpers;
using RabbitMQ.Client;
using SriCare.Billing.Application.interfaces;

namespace SriCare.Billing.Infrastructure.Services
{
    internal class NotificationQueueClient(IConnection connection) : RabbitMQClient(connection, queueName), INotificationQueueClient
    {
        private const string queueName = "notificationEvents";
    }
}