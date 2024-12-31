
using Common.Utils.Account;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SriCare.Core.Application.Features.Plans.GetActivePlans;

namespace SriCare.Core.Api.Controllers
{
    [Route("plans")]
    [Authorize]
    [ApiController]
    public class PlanController(IMediator bus, ILogger<PlanController> logger, IUserIdentity user) : ControllerBase
    {
        private readonly IMediator bus = bus;
        private readonly IUserIdentity user = user;
        private readonly ILogger<PlanController> logger = logger;

        [HttpGet]
        public async Task<IActionResult> GetActivePlans([FromQuery] GetActivePlansQuery query)
        {
            logger.LogInformation("Get active plans");
            return Ok(await bus.Send(query));
        }

    }
}