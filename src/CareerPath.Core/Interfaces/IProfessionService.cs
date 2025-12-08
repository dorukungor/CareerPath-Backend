using CareerPath.Core.Entities;

namespace CareerPath.Core.Interfaces;

public interface IProfessionService
{
    Task<IEnumerable<Profession>> GetAllAsync();
    Task<Profession?> GetByIdAsync(Guid id);
}
