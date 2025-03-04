using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SriCare.Core.Api.Swagger;
using Common.Utils;
using Common.Utils.Middlewares;
using SriCare.Core.Infrastructure;
using SriCare.Core.Persistence;
using SriCare.Core.Api.HostedServices;
using SriCare.Core.Api.MediatR;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddServiceDefaults();

builder.Services.AddSwaggerDoc();

builder.Services.AddControllers()
        .AddJsonOptions(options => {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                // options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                // options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            });
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
builder.Services.AddInfraConfigurations();
builder.Services.AddMediatRConfiguration();
builder.AddNpgsqlDbContext<CoreDBContext>("coredb", configureSettings:settings => {settings.DisableRetry = false;});
builder.Services.AddEFConfigurations();
builder.Services.AddHostedService<RabbitMQService>();

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

app.UseConfigureExceptionHandler();
// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseUserIdentityMiddleware();

app.MapControllers();

app.Run();
