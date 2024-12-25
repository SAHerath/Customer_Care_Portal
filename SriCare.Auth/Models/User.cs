using Microsoft.AspNetCore.Identity;

namespace SriCare.Auth.Models;

public class User:IdentityUser{
    public  string? FirstName { get; set; }
    public  string? LastName { get; set; }
}