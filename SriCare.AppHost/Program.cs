var builder = DistributedApplication.CreateBuilder(args);

var authService = builder.AddProject<Projects.SriCare_Auth>("authService");

// Configure API Gateway
var apiGateway = builder.AddProject<Projects.SriCare_ApiGateway>("apigateway")
    .WithReference(authService);

builder.Build().Run();
