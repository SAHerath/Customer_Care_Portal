namespace Common.Utils.Account;

public interface IUserIdentity{
    public string UserName { get; set; }
    public string AccessToken { get; set; }
    public string Id { get; set; }
    public string Email { get; set; }
}