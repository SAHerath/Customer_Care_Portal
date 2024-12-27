using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using SriCare.Core.Domain.ActivePlans;

namespace SriCare.Core.Persistence;

public static class DBMigrationExtensions
{
    public static async Task ConfigureDatabaseAsync(this WebApplication app){
        using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CoreDBContext>();

        await EnsureDatabaseAsync(dbContext);
        await RunMigrationsAsync(dbContext);
        await SeedDataAsync(dbContext);
    }

    private static async Task EnsureDatabaseAsync(CoreDBContext dbContext){
        var dbCreator = dbContext.GetService<IRelationalDatabaseCreator>();

        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async ()=>{
            if(!await dbCreator.ExistsAsync()){
                await dbCreator.CreateAsync();
            }
        });
    }

    private static async Task RunMigrationsAsync(CoreDBContext dbContext)
    {
        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async () =>
        {
            // Remove the explicit transaction
            await dbContext.Database.MigrateAsync();
        });
    }

    private static async Task SeedDataAsync(CoreDBContext dbContext)
    {
        if (await dbContext.ActivePlans.AnyAsync())
        {
            return; // Data already exists
        }

        var filePath = Path.Combine(AppContext.BaseDirectory, "Seeds", "activePlans.json");
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Seed data file not found: {filePath}");
        }

        var jsonData = await File.ReadAllTextAsync(filePath);
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter() } // Allow enums as strings
        };

        var activePlans = JsonSerializer.Deserialize<List<ActivePlan>>(jsonData, options);

        if (activePlans != null)
        {
            dbContext.ActivePlans.AddRange(activePlans);
            await dbContext.SaveChangesAsync();
        }
    }
}