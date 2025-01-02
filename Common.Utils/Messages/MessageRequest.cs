using System.Text.Json.Serialization;

namespace Common.Utils.Messages
{
    public class MessageRequest(IMessage message)
    {
        [JsonInclude]
        public string Type { get; } = message.GetType().Name;

        [JsonInclude]
        public IMessage Message { get; } = message;
    }
}