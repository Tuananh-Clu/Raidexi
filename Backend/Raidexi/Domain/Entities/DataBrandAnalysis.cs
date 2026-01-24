using Raidexi.Application.Dtos;
using Raidexi.Domain.Interfaces;

namespace Raidexi.Domain.Entities
{
    public class DataBrandAnalysis
    {
        public string userId { get; set; }
        public ResultAnalysis measure { get; set; }
    }
}
