using Common.Utils.Account;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SriCare.Core.Application.Features.Roaming.ActivateRoamingPackage;
using SriCare.Core.Application.Features.Roaming.GetRoamingByUserId;
using SriCare.Core.Application.Features.Roaming.UpdateRoamingStatus;

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

    [HttpPatch("{roamingId}/activate")]
    public async Task<IActionResult> UpdateActivateFlag(Guid roamingId, [FromBody] UpdateRoamingStatusCommand command)
    {
        logger.LogInformation("Update Roaming Activation");
        command.Id = roamingId;
        await bus.Send(command);
        return Ok();
    }

    [HttpPost("{roamingId}/activate-package/{packageId}")]
    public async Task<IActionResult> ActivateRoamingPackage(Guid roamingId, Guid packageId)
    {
        logger.LogInformation("Activate roaming package");
        await bus.Send(new ActivateRoamingPackageCommand { RoamingId = roamingId, PackageId = packageId });
        return Ok();
    }

}