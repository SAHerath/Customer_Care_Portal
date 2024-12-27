using MediatR;

namespace SriCare.Core.Application.Features.Roaming.ActivateRoamingPackage
{
    public class ActivateRoamingPackageCommand:IRequest
    {
        public Guid RoamingId { get; set; }
        public Guid PackageId { get; set; }
    }
}