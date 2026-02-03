using Microsoft.AspNetCore.Mvc;
using VehicleManagement.Api.Logging;
using VehicleManagement.Api.Models;

namespace VehicleManagement.Api.Controllers
{
    [ApiController]
    [Route("api/logs")]
    public class LogsController : ControllerBase
    {
        private readonly MongoApiLogger _logger;

        public LogsController(MongoApiLogger logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLog([FromBody] ApiLogEntry logEntry)
        {
            logEntry.LoggedAt = DateTime.UtcNow;

            await _logger.LogAsync(logEntry);

            return Ok(new { message = "Log saved successfully" });
        }

    }
}
