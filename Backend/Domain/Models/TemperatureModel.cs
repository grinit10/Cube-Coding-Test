using Domain.Enums;

namespace Domain.Models
{
    public class TemperatureModel
    {
        public UnitType Unit { get; set; }
        public double Temperature { get; set; }
    }
}
