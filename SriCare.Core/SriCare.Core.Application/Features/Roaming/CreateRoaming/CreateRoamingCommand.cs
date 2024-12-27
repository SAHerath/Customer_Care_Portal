using MediatR;

namespace SriCare.Core.Application.Features.Roaming.CreateRoaming;

public class CreateRoamingCommand: IRequest
{
    public Guid UserId { get; set; }
    public string Email { get; set; }
}