using System.IdentityModel.Tokens.Jwt;
using Common.Utils.Account;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Common.Utils.Middlewares;

public class UserIdentityMiddleware{
    private readonly RequestDelegate _next;

        public UserIdentityMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext, IUserIdentity userIdentity)
        {
            if (httpContext.User.Identity.IsAuthenticated)
            {
                userIdentity.UserName = httpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)?.Value;
                userIdentity.Id = httpContext.User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                userIdentity.AccessToken = httpContext.Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString().Replace("Bearer ", "");
                userIdentity.Email = httpContext.User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            }

            return _next(httpContext);
        }
}

public static class UserIdentityMiddlewareExtensions
    {
        public static IApplicationBuilder UseUserIdentityMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserIdentityMiddleware>();
        }
    }