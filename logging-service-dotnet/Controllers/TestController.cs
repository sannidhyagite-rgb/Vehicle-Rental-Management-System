using Microsoft.AspNetCore.Mvc;

namespace VMS.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet("throw-error")]
        public IActionResult ThrowError()
        {
            throw new Exception("Test exception from API");
        }
    }
}
