namespace SriCare.Auth.Dtos.User;

public record CreateUserDto(
    string Email,
    string Password,
    string FirstName,
    string LastName
);