using System;
using System.Linq;
using Domain.Enums;
using Domain.Models;
using Domain.ViewModels;
using System.Collections.Generic;

namespace Bl.Services
{
    public class TemperatureService : ITemperatureService
    {
        public TemperatureViewModel ConvertFromTemp(TemperatureModel temperatureModel) =>
            temperatureModel.Unit switch
            {
                UnitType.Celsius => ConvertFromCelsius(temperatureModel),
                UnitType.Fahrenheit => ConvertFromFahrenheit(temperatureModel),
                _ => ConvertFromKelvin(temperatureModel)
            };

        public List<DropDownModel> GetUnits() =>
            (from UnitType unit in Enum.GetValues(typeof(UnitType)) select new DropDownModel {Id = (int) unit, Name = unit.ToString()}).ToList();

        private static TemperatureViewModel ConvertFromCelsius(TemperatureModel temperatureModel) =>
            new()
            {
                CelsiusTemperature = temperatureModel.Temperature,
                FahrenheitTemperature = temperatureModel.Temperature * 9 / 5 + 32,
                KelvinTemperature = temperatureModel.Temperature + 273.15
            };
            

        private static TemperatureViewModel ConvertFromFahrenheit(TemperatureModel temperatureModel) =>
            new()
            {
                CelsiusTemperature = (temperatureModel.Temperature - 32) * 5 / 9,
                FahrenheitTemperature = temperatureModel.Temperature,
                KelvinTemperature = (temperatureModel.Temperature + 459.67) * 5 / 9
            };

        private static TemperatureViewModel ConvertFromKelvin(TemperatureModel temperatureModel) =>
            new()
            {
                CelsiusTemperature = temperatureModel.Temperature - 273.15,
                FahrenheitTemperature = temperatureModel.Temperature * 9 / 5 - 459.67,
                KelvinTemperature = temperatureModel.Temperature
            };
    }
}
