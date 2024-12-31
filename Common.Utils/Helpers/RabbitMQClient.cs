
using System.Text;
using Common.Utils.Messages;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace Common.Utils.Helpers
{
    public class RabbitMQClient : IRabbitMQClient
    {
        protected readonly IModel channel;
        private readonly string queueName;
        private readonly string exchange;
        private readonly string exchangeType;

         public RabbitMQClient(IConnection connection,
            string queueName,
            string exchange = "",
            string exchangeType = "",
            bool initializeQueue = false)
        {
            this.queueName = queueName;
            this.exchange = exchange;
            this.exchangeType = exchangeType;

            channel = connection.CreateModel();

            if (initializeQueue == true) Initialize();
        }

        private void Initialize()
        {
            channel.QueueDeclare(queue: queueName,
                         durable: true,
                         exclusive: false,
                         autoDelete: false,
                         arguments: null);

            if (!string.IsNullOrEmpty(exchange))
            {
                channel.ExchangeDeclare(exchange: exchange, type: string.IsNullOrEmpty(exchangeType) ? "direct" : exchangeType, durable: true, autoDelete: false);

                channel.QueueBind(queueName, exchange, queueName);
            }
        }

        
        public virtual void SendMessage(IMessage message)
        {
            var request = new MessageRequest(message);

            string json = JsonConvert.SerializeObject(request);
            var body = Encoding.UTF8.GetBytes(json);

            channel.BasicPublish(exchange: exchange,
                                 routingKey: queueName,
                                 basicProperties: null,
                                 body: body);
        }

        public void Dispose()
        {
            channel.Dispose();
        }

        public IModel GetChannel()
        {
            return channel;
        }
    }
}