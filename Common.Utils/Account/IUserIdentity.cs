namespace Common.Utils.Account;

public interface IUserIdentity{
    public string UserName { get; set; }
    public string AccessToken { get; set; }
    public Guid Id { get; set; }
    public string Email { get; set; }
}