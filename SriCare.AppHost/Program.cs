using Microsoft.AspNetCore.Hosting;

var builder = DistributedApplication.CreateBuilder(args);


// var userName = builder.AddParameter("userName", secret: true);
var password = builder.AddParameter("password", secret: true);
var postgresServer = builder.AddPostgres("postgresServer", password)
                        .WithDataVolume();
                        // .WithPgAdmin();

var messaging = builder.AddRabbitMQ("messaging");


var authDB = postgresServer.AddDatabase("authdb");
var authService = builder.AddProject<Projects.SriCare_Auth>("authService")
                    .WithReference(authDB)
                    .WithReference(messaging)
                    .WithEnvironment("GATEWAY_URL","https://localhost:7155")
                    .WithEnvironment("REDIRECT_URL","https://localhost:5000")
                    .WaitFor(authDB)
                    .WaitFor(messaging);

var coreDB = postgresServer.AddDatabase("coredb");
var coreService = builder.AddProject<Projects.SriCare_Core_Api>("coreService")
                    .WithReference(coreDB)
                    .WithReference(messaging)
                    .WaitFor(coreDB)
                    .WaitFor(messaging);

var paymentService = builder.AddNpmApp("paymentService","../SriCare.Payment", "start:all")
                    .WithHttpsEndpoint(port: 7200, env: "PORT",targetPort: 5005)
                    .WithEnvironment("GATEWAY_PORT", "7201")
                    .WithEnvironment("JWT_ISSUER", "https://authService/")
                    .WithEnvironment("JWT_AUDIENCE", "apis")
                    .WithEnvironment("JWT_SIGNING_KEY", "a3d42138-edb7-4eb7-9f89-dbc39ba1c6c4");
                  

var billingService = builder.AddProject<Projects.SriCare_Billing_Api>("billingService")
                    .WithReference(messaging)
                    .WithReference(paymentService)
                    .WaitFor(messaging)
                    .WaitFor(paymentService)
                    .WithReference(coreService);

var notificationService = builder.AddProject<Projects.SriCare_Notification_Api>("notificationService")
                    .WithReference(messaging)
                    .WaitFor(messaging);

// Configure API Gateway
var apiGateway = builder.AddProject<Projects.SriCare_ApiGateway>("apigateway")
    .WithReference(authService)
    .WithReference(coreService)
    .WithReference(paymentService)
    .WithReference(billingService)
    .WithReference(notificationService)
    .WithExternalHttpEndpoints();

builder.AddNpmApp("webPortal","../SriCare.Webportal","dev")
    .WithReference(apiGateway)
    .WaitFor(apiGateway)
    .WithHttpsEndpoint(port: 5000, env: "PORT",targetPort: 5173)
    .WithExternalHttpEndpoints();

builder.Build().Run();
