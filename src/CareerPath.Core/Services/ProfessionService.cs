using CareerPath.Core.Entities;
using CareerPath.Core.Interfaces;
using CareerPath.Data;
using Microsoft.EntityFrameworkCore;

namespace CareerPath.Core.Services;

public class ProfessionService : IProfessionService
{
    private readonly AppDbContext _context;

    public ProfessionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Profession>> GetAllAsync()
    {
        return await _context.Professions
            .Include(p => p.RoadmapSteps.OrderBy(s => s.OrderIndex))
            .ToListAsync();
    }

    public async Task<Profession?> GetByIdAsync(Guid id)
    {
        return await _context.Professions
            .Include(p => p.RoadmapSteps.OrderBy(s => s.OrderIndex))
            .ThenInclude(s => s.Resources)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}
