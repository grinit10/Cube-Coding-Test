using System.Linq;
using Bl.Services;
using Domain.Enums;
using Domain.Models;
using NUnit.Framework;
using Domain.ViewModels;

namespace UT
{
    public class TemperatureServiceTests
    {
        private readonly ITemperatureService _temperatureService;

        public TemperatureServiceTests()
        {
            _temperatureService = new TemperatureService();
        }

        [Test]
        public void TestFromCelsius()
        {
            var expected = new TemperatureViewModel
            {
                CelsiusTemperature = 23,
                FahrenheitTemperature = 73.4,
                KelvinTemperature = 296.15
            };
            var result = _temperatureService.ConvertFromTemp(new TemperatureModel
            {
                Temperature = 23,
                Unit = UnitType.Celsius
            });

            Assert.AreEqual(expected.CelsiusTemperature, result.CelsiusTemperature);
            Assert.AreEqual(expected.FahrenheitTemperature, result.FahrenheitTemperature);
            Assert.AreEqual(expected.KelvinTemperature, result.KelvinTemperature);
        }

        [Test]
        public void TestFromFahrenheit()
        {
            var expected = new TemperatureViewModel
            {
                CelsiusTemperature = 1.1111111111111112,
                FahrenheitTemperature = 34,
                KelvinTemperature = 274.26111111111112
            };
            var result = _temperatureService.ConvertFromTemp(new TemperatureModel
            {
                Temperature = 34,
                Unit = UnitType.Fahrenheit
            });

            Assert.AreEqual(expected.CelsiusTemperature, result.CelsiusTemperature);
            Assert.AreEqual(expected.FahrenheitTemperature, result.FahrenheitTemperature);
            Assert.AreEqual(expected.KelvinTemperature, result.KelvinTemperature);
        }
        

        [Test]
        public void TestFromKelvin()
        {
            var expected = new TemperatureViewModel
            {
                CelsiusTemperature = -239.14999999999998,
                FahrenheitTemperature = -398.47000000000003,
                KelvinTemperature = 34
            };
            var result = _temperatureService.ConvertFromTemp(new TemperatureModel
            {
                Temperature = 34,
                Unit = UnitType.Kelvin
            });

            Assert.AreEqual(expected.CelsiusTemperature, result.CelsiusTemperature);
            Assert.AreEqual(expected.FahrenheitTemperature, result.FahrenheitTemperature);
            Assert.AreEqual(expected.KelvinTemperature, result.KelvinTemperature);
        }

        [Test]
        public void TestGetUnits()
        {
            
            var result = _temperatureService.GetUnits();

            Assert.AreEqual(3, result.Count);
            Assert.AreEqual(0, result.First().Id);
            Assert.AreEqual(2, result.Last().Id);
        }
    }
}