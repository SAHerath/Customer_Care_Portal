using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Utils.Helpers;

namespace SriCare.Billing.Application.interfaces
{
    public interface INotificationQueueClient : IRabbitMQClient
    {
        
    }
}