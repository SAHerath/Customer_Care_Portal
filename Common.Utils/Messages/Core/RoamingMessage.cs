namespace Common.Utils.Messages.Core
{
    public class RoamingMessage : IMessage
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}