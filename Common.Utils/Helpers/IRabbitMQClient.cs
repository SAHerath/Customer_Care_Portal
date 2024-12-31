using Common.Utils.Messages;
using RabbitMQ.Client;

namespace Common.Utils.Helpers
{
    public interface IRabbitMQClient
    {
        void SendMessage(IMessage message);
        void Dispose();
        IModel GetChannel();
    }
}