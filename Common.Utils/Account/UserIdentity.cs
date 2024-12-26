namespace Common.Utils.Account;

public class UserIdentity : IUserIdentity
{
    public string UserName { get; set; }
    public string AccessToken { get; set; }
    public string Email { get; set; }
    public string Id { get; set; }
}