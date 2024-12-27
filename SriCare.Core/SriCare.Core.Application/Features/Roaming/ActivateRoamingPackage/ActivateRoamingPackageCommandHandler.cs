using Common.Utils.Exceptions;
using MediatR;
using SriCare.Core.Application.Interfaces;
using SriCare.Core.Domain.Roaming;

namespace SriCare.Core.Application.Features.Roaming.ActivateRoamingPackage
{
    public class ActivateRoamingPackageCommandHandler : IRequestHandler<ActivateRoamingPackageCommand>
    {
        private readonly IUnitOfWork uow;

        public ActivateRoamingPackageCommandHandler(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task Handle(ActivateRoamingPackageCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var roaming = await uow.Roaming.GetById(request.RoamingId) ?? 
                    throw new CustomValidationException(new ErrorModel("ActivateRoamingPackage", $"Roaming is not found for given id {request.RoamingId}"));

            var package = await uow.ActivePlans.GetById(request.PackageId) ?? throw new CustomValidationException(new ErrorModel("ActivateRoamingPackage", $"Package detail is not found for given id {request.PackageId}"));

            if(package.Type != Domain.Enums.PlanType.Roaming)
            {
                throw new CustomValidationException(new ErrorModel("ActivateRoamingPackage", "Selected package not support for roaming"));
            }

            var roamingPackage = new RoamingPlan {
                RoamingId = roaming.Id,
                ActivePlanId = request.PackageId,
                PlanName = package.PlanName,
                Price = package.Price,
                Validity = package.Validity,
                SMSQuota = package.SMSQuota,
                CallQuota = package.CallQuota,
                DataQuota = package.DataQuota,
            };

            uow.RoamingPlans.Create(roamingPackage);
            await uow.SaveAsync();
        }
    }
}