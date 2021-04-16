using Domain.Models;
using Domain.ViewModels;
using System.Collections.Generic;

namespace Bl.Services
{
    public interface ITemperatureService
    {
        TemperatureViewModel ConvertFromTemp(TemperatureModel temperatureModel);
        List<DropDownModel> GetUnits();
    }
}
