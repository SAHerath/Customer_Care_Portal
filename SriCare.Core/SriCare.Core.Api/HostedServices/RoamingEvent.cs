namespace SriCare.Core.Api.HostedServices;

public class RoamingEvent
{
    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}