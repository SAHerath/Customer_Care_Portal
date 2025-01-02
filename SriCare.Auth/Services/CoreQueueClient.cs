using Common.Utils.Helpers;
using RabbitMQ.Client;
using SriCare.Auth.interfaces;

namespace SriCare.Auth.Services
{
    internal class CoreQueueClient(IConnection connection) : RabbitMQClient(connection, queueName), ICoreQueueClient
    {
        private const string queueName = "roamingEvents";
    }
}