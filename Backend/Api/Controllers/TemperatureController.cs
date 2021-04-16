using Bl.Services;
using Domain.Enums;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemperatureController : ControllerBase
    {
        private readonly ITemperatureService _temperatureService;

        public TemperatureController(ITemperatureService temperatureService)
        {
            _temperatureService = temperatureService;
        }

        [HttpGet]
        public IActionResult Get(double temperature, UnitType unit) =>
            Ok(_temperatureService.ConvertFromTemp(new TemperatureModel
            {
                Temperature = temperature,
                Unit = unit
            }));

        [HttpGet("units")]
        public IActionResult Get() =>
            Ok(_temperatureService.GetUnits());
    }
}
