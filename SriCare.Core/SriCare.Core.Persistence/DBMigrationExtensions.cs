using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace SriCare.Core.Persistence;

public static class DBMigrationExtensions
{
    public static async Task ConfigureDatabaseAsync(this WebApplication app){
        using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CoreDBContext>();

        await EnsureDatabaseAsync(dbContext);
        await RunMigrationsAsync(dbContext);
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
}