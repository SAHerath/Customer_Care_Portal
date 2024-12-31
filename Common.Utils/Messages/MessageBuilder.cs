using System.Text;
using Newtonsoft.Json;

namespace Common.Utils.Messages
{
    public static class MessageBuilder
    {
        public static MessageResponse GetMessage(byte[] body)
        {
            string json = Encoding.UTF8.GetString(body);
            var obj = JsonConvert.DeserializeObject<dynamic>(json);

            return new MessageResponse(obj.Type.Value, Convert.ToString(obj.Message));
        }
    }
}