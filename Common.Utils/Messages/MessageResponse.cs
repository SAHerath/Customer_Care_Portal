using Newtonsoft.Json;

namespace Common.Utils.Messages
{
    public class MessageResponse
    {
        private readonly string messageJson;
        public string Type { get; }

        public MessageResponse() { }

        public MessageResponse(string type, string messageJson)
        {
            Type = type;
            this.messageJson = messageJson;
        }

        public T Convert<T>() where T : class
        {
            return JsonConvert.DeserializeObject<T>(messageJson);
        }
    }
}