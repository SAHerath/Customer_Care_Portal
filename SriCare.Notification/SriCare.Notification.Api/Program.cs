using Common.Utils;
using Common.Utils.Middlewares;
using SriCare.Notification.Api.HostedServices;
using SriCare.Notification.Api.MediatR;
using SriCare.Notification.Infra;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddServiceDefaults();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.AddRabbitMQClient("messaging");
builder.Services.AddCommonUtilsConfigurations();
builder.Services.AddInfraConfigurations(builder.Configuration);
builder.Services.AddMediatRConfiguration();
builder.Services.AddHostedService<NotificationsMQService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseConfigureExceptionHandler();
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
