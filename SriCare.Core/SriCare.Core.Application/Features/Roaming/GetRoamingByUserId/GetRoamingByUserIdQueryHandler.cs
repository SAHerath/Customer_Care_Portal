using Common.Utils.Exceptions;
using MediatR;
using SriCare.Core.Application.Interfaces;

namespace SriCare.Core.Application.Features.Roaming.GetRoamingByUserId;

public class GetRoamingByUserIdQueryHandler : IRequestHandler<GetRoamingByUserIdQuery, RoamingDto>
{
    private readonly IUnitOfWork uow;

    public GetRoamingByUserIdQueryHandler(IUnitOfWork uow)
    {
        this.uow = uow;
    }
    
    public async Task<RoamingDto> Handle(GetRoamingByUserIdQuery request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        var roaming = await uow.Roaming.GetByUserIdAsync(request.UserId) ??
             throw new CustomValidationException(new ErrorModel("GetRoamingByUserId", $"User is not found for given id {request.UserId}"));

        return new RoamingDto{
                Id = roaming.Id,
                UserId = roaming.UserId,
                Activate = roaming.Activate,
                ActivatedPlans = roaming.RoamingPlans,
        };
        
    }
}