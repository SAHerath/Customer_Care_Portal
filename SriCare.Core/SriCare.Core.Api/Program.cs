using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SriCare.Core.Api.Swagger;
using Common.Utils;
using Common.Utils.Middlewares;
using MediatR;
using SriCare.Core.Persistence;
using SriCare.Core.Api.HostedServices;
using SriCare.Core.Api.MediatR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddServiceDefaults();

builder.Services.AddSwaggerDoc();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.AddRabbitMQClient("messaging");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>{
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SignInKey"])),
        ValidateLifetime = true,
    };
});
builder.Services.AddAuthorization();
builder.Services.AddCommonUtilsConfigurations();
builder.Services.AddMediatRConfiguration();
builder.AddNpgsqlDbContext<CoreDBContext>("coredb", configureSettings:settings => {settings.DisableRetry = false;});
builder.Services.AddEFConfigurations();
builder.Services.AddHostedService<RabbitMQService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.ConfigureDatabaseAsync();
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseConfigureExceptionHandler();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseUserIdentityMiddleware();

app.MapControllers();

app.Run();
