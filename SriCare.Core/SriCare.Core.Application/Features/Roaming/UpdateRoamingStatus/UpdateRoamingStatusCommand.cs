using System.Text.Json.Serialization;
using MediatR;

namespace SriCare.Core.Application.Features.Roaming.UpdateRoamingStatus;

public class UpdateRoamingStatusCommand : IRequest
{
    [JsonIgnore]
    public Guid Id { get;  set; }
    public bool Activate { get; set; }
}
