var builder = DistributedApplication.CreateBuilder(args);


// var userName = builder.AddParameter("userName", secret: true);
var password = builder.AddParameter("password", secret: true);

var postgresServer = builder.AddPostgres("postgresServer", password).WithDataVolume().WithPgAdmin();

var authDB = postgresServer.AddDatabase("authdb");
var authService = builder.AddProject<Projects.SriCare_Auth>("authService")
                    .WithReference(authDB)
                    .WaitFor(authDB);

var coreService = builder.AddProject<Projects.SriCare_Core_Api>("coreService");

// Configure API Gateway
var apiGateway = builder.AddProject<Projects.SriCare_ApiGateway>("apigateway")
    .WithReference(authService)
    .WithReference(coreService);

builder.Build().Run();
