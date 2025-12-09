using CareerPath.Core.DTOs;

namespace CareerPath.Core.Interfaces;

public interface IProfessionService
{
    Task<IEnumerable<ProfessionDto>> GetAllAsync();
    Task<ProfessionDto?> GetByIdAsync(Guid id);
}
