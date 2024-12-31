var builder = DistributedApplication.CreateBuilder(args);


// var userName = builder.AddParameter("userName", secret: true);
var password = builder.AddParameter("password", secret: true);
var postgresServer = builder.AddPostgres("postgresServer", password).WithDataVolume().WithPgAdmin();

var messaging = builder.AddRabbitMQ("messaging");


var authDB = postgresServer.AddDatabase("authdb");
var authService = builder.AddProject<Projects.SriCare_Auth>("authService")
                    .WithReference(authDB)
                    .WithReference(messaging)
                    .WaitFor(authDB)
                    .WaitFor(messaging);

var coreDB = postgresServer.AddDatabase("coredb");
var coreService = builder.AddProject<Projects.SriCare_Core_Api>("coreService")
                    .WithReference(coreDB)
                    .WithReference(messaging)
                    .WaitFor(coreDB)
                    .WaitFor(messaging);

var notificationService = builder.AddProject<Projects.SriCare_Notification_Api>("notificationService")
                    .WithReference(messaging)
                    .WaitFor(messaging);

// Configure API Gateway
var apiGateway = builder.AddProject<Projects.SriCare_ApiGateway>("apigateway")
    .WithReference(authService)
    .WithReference(coreService)
    .WithReference(notificationService);

builder.Build().Run();
