using MediatR;

namespace SriCare.Core.Application.Features.Roaming.GetRoamingByUserId;

public class GetRoamingByUserIdQuery:IRequest<RoamingDto>
{
    public Guid UserId { get; set; }
}