using MediatR;
using SriCare.Core.Application.Interfaces;

namespace SriCare.Core.Application.Features.Roaming.CreateRoaming;

public class CreateRoamingCommandHandler(IUnitOfWork uow) : IRequestHandler<CreateRoamingCommand>
{
    private readonly IUnitOfWork uow = uow;

    public async Task Handle(CreateRoamingCommand request, CancellationToken cancellationToken)
    {
        Domain.Roaming.Roaming roaming = new(){
            UserId = request.UserId,
            Activate = true,
            CreatedBy = request.Email,
            CreatedDateTime = DateTime.UtcNow,
        };

        uow.Roaming.Create(roaming);
        await uow.SaveAsync();
    }
}