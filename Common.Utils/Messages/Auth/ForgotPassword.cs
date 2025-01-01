namespace Common.Utils.Messages.Auth
{
    public class ForgotPassword : IMessage
    {
        public string Email { get; set; }
        public string Body { get; set; }
    }
}