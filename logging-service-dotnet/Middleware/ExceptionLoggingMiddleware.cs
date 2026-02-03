using System.Net;
using VehicleManagement.Api.Logging;
using VehicleManagement.Api.Models;

namespace VehicleManagement.Api.Middleware
{
    public class ExceptionLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly MongoApiLogger _logger;

        public ExceptionLoggingMiddleware(
            RequestDelegate next,
            MongoApiLogger logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                // Log exception to MongoDB
                await _logger.LogAsync(new ApiLogEntry
                {
                    ServiceName = "DotNet",
                    Path = context.Request.Path,
                    HttpMethod = context.Request.Method,
                    Message = $"EXCEPTION: {ex.Message}",
                    LoggedAt = DateTime.UtcNow
                });

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync("An unexpected error occurred.");
            }
        }
    }
}
