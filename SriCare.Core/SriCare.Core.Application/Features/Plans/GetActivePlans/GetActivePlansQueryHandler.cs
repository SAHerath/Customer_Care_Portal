using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using SriCare.Core.Application.Interfaces;
using SriCare.Core.Domain.ActivePlans;

namespace SriCare.Core.Application.Features.Plans.GetActivePlans
{
    public class GetActivePlansQueryHandler : IRequestHandler<GetActivePlansQuery, IEnumerable<ActivePlan>>
    {
        private readonly IUnitOfWork uow;

        public GetActivePlansQueryHandler(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task<IEnumerable<ActivePlan>> Handle(GetActivePlansQuery request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            return await uow.ActivePlans.FilterActivePlans(request.Type);
        }
    }
}