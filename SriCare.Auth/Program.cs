using Microsoft.AspNetCore.Identity;
using SriCare.Auth.Data;
using SriCare.Auth.Models;
using SriCare.Auth.Swagger;
using SriCare.Auth.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SriCare.Auth.interfaces;
using SriCare.Auth.Services;

var builder = WebApplication.CreateBuilder(args);

builder.AddNpgsqlDbContext<AppDBContext>("authdb", configureSettings:settings => {
    settings.DisableRetry = false;
});

// Add services to the container.
builder.AddServiceDefaults();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDoc();
builder.AddRabbitMQClient("messaging");

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add IdentityCore
builder.Services
    .AddIdentityCore<User>()
    .AddEntityFrameworkStores<AppDBContext>()
    .AddApiEndpoints()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>{
    options.DefaultAuthenticateScheme = 
    options.DefaultChallengeScheme = 
    options.DefaultForbidScheme = 
    options.DefaultScheme = 
    options.DefaultSignInScheme = 
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>{
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SignInKey"]))
    };
});
// .AddBearerToken(IdentityConstants.BearerScheme);

builder.Services.AddAuthorization();
builder.Services.AddSingleton<ICoreQueueClient, CoreQueueClient>();
builder.Services.AddSingleton<INotificationQueueClient, NotificationQueueClient>();

builder.Services.AddCors(options =>{
    options.AddPolicy("customPolicy",policy => {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("customPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.ConfigureDatabaseAsync();
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable Identity APIs
app.CustomMapIdentityApi<User>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
