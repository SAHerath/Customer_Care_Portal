using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SriCare.Auth.Models;

namespace SriCare.Auth.Data;

public class AppDBContext(DbContextOptions<AppDBContext> options) : IdentityDbContext<User>(options)
{
}