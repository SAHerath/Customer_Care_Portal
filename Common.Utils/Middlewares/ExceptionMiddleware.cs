using System.Net;
using Common.Utils.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace Common.Utils.Middlewares;

public static class ExceptionMiddleware
    {
        public static void UseConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        if (contextFeature.Error is CustomValidationException)
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                            context.Response.ContentType = "application/json";
                            await context.Response.WriteAsync(contextFeature.Error.Message);
                        }
                        else
                        {
                            //TODO need to implement common error loggin mechanism
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            context.Response.ContentType = "application/json";
                            await context.Response.WriteAsync("Something went wrong");
                        }
                    }
                });
            });
        }
    }