using Common.Utils.Account;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SriCare.Core.Application.Features.Roaming.GetRoamingByUserId;

namespace SriCare.Core.Api.Controllers;

[Route("roaming")]
[Authorize]
[ApiController]
public class RoamingController(IMediator bus, ILogger<RoamingController> logger, IUserIdentity user) : ControllerBase
{
    private readonly IMediator bus = bus;
    private readonly ILogger<RoamingController> logger = logger;
    private readonly IUserIdentity userIdentity = user;

    [HttpGet]
    public async Task<IActionResult> GetByUserId() {
        logger.LogInformation("Calling get method");
        return Ok(await bus.Send(new GetRoamingByUserIdQuery { UserId = userIdentity.Id}));
    }
}