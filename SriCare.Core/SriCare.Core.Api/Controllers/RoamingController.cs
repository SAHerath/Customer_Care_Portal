using Common.Utils.Account;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace SriCare.Core.Api.Controllers;

[Route("roaming")]
[ApiController]
public class RoamingController(IMediator bus, ILogger<RoamingController> logger, IUserIdentity user) : ControllerBase
{
    private readonly IMediator bus = bus;
    private readonly ILogger<RoamingController> logger = logger;
    private readonly IUserIdentity userIdentity = user;

    [HttpGet]
    public async Task<OkObjectResult> GetByUserId() {
        logger.LogInformation("Calling get method");
        return Ok("Test User");
    }
}