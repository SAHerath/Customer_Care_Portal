namespace Common.Utils.Messages.Auth
{
    public class EmailConfirmation : IMessage
    {
        public string Email { get; set; }
        public string Body { get; set; }
    }
}