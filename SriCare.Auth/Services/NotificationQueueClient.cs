using Common.Utils.Helpers;
using RabbitMQ.Client;
using SriCare.Auth.interfaces;

namespace SriCare.Auth.Services
{
    internal class NotificationQueueClient(IConnection connection) : RabbitMQClient(connection, queueName), INotificationQueueClient
    {
        private const string queueName = "notificationEvents";
    }
}