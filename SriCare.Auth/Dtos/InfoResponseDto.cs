namespace SriCare.Auth.Dtos;

public record InfoResponseDto{
    public  string Email { get; init; }
    public  bool IsEmailConfirmed { get; init; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Id { get; set; }
}