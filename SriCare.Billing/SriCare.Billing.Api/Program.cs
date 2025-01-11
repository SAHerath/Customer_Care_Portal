using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Common.Utils;
using Common.Utils.Middlewares;
using SriCare.Billing.Api.Swagger;
using Carter;
using SriCare.Billing.Api.MediatR;
using Microsoft.AspNetCore.Http.Json;
using System.Text.Json.Serialization;
using SriCare.Billing.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddServiceDefaults();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.AddRabbitMQClient("messaging");
builder.Services.AddSwaggerDoc();

builder.Services.Configure<JsonOptions>(options => options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddCarter();
builder.Services.Configure<JsonOptions>(options => {options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());});
builder.Services.AddMediatRConfiguration();
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
builder.Services.AddInfrastructureConfigurations();

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
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseConfigureExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();
app.UseUserIdentityMiddleware();

app.MapCarter();

app.Run();
