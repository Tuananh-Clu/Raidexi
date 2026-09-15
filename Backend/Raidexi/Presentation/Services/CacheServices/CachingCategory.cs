using System.Reflection;
using Raidexi.Domain.Entities;

namespace Raidexi.Presentation.Services.CacheServices
{
    public class CachingCategory
    {
        private static readonly PropertyInfo[] FloatProperties;

        static CachingCategory()
        {
            FloatProperties = typeof(MeasureData)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(float))
                .ToArray();
        }

        public Dictionary<string, int> CategoryCache(MeasureData measureData)
        {
            return FloatProperties
                .Select(p => new { Name = p.Name, Value = (float)p.GetValue(measureData)! })
                .Where(x => x.Value > 0)
                .ToDictionary(x => x.Name, x => (int)Math.Round(x.Value));
        }
    }

}