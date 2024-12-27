using Common.Utils.Exceptions;
using MediatR;
using SriCare.Core.Application.Interfaces;

namespace SriCare.Core.Application.Features.Roaming.UpdateRoamingStatus;

internal class UpdateRoamingStatusCommandHandler(IUnitOfWork uow) : IRequestHandler<UpdateRoamingStatusCommand>
{
    private readonly IUnitOfWork uow = uow;

    public async Task Handle(UpdateRoamingStatusCommand request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var roaming = await uow.Roaming.GetById(request.Id) ?? throw new CustomValidationException(new ErrorModel("UpdateRoamingStatus", $"Roaming is not found for given id {request.Id}"));
    
        roaming.Activate = request.Activate;
        await uow.SaveAsync();
    }
}