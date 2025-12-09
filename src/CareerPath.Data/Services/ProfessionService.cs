using CareerPath.Core.DTOs;
using CareerPath.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerPath.Data.Services;

public class ProfessionService : IProfessionService
{
    private readonly AppDbContext _context;

    public ProfessionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProfessionDto>> GetAllAsync()
    {
        return await _context.Professions
            .Select(p => new ProfessionDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                AvgSalary = p.AvgSalary,
                DifficultyLevel = p.DifficultyLevel
            })
            .ToListAsync();
    }

    public async Task<ProfessionDto?> GetByIdAsync(Guid id, Guid? userId = null)
    {
        var profession = await _context.Professions
            .Include(p => p.RoadmapSteps)
            .ThenInclude(rs => rs.Resources)
            .FirstOrDefaultAsync(p => p.Id == id);
            
        if (profession == null) return null;

        // Kullanıcı giriş yapmışsa tamamladığı adımların ID'lerini çekiyoruz
        var completedStepIds = new HashSet<Guid>();
        if (userId.HasValue)
        {
            completedStepIds = (await _context.UserStepProgresses
                .Where(usp => usp.UserId == userId.Value && usp.RoadmapStep.ProfessionId == id)
                .Select(usp => usp.RoadmapStepId)
                .ToListAsync())
                .ToHashSet();
        }

        return new ProfessionDto
        {
            Id = profession.Id,
            Title = profession.Title,
            Slug = profession.Slug,
            AvgSalary = profession.AvgSalary,
            DifficultyLevel = profession.DifficultyLevel,
            RoadmapSteps = profession.RoadmapSteps
                .OrderBy(s => s.OrderIndex)
                .Select(s => new RoadmapStepDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    Summary = s.Summary,
                    Description = s.Description,
                    OrderIndex = s.OrderIndex,
                    MustKnow = s.MustKnow,
                    IsCompleted = completedStepIds.Contains(s.Id),
                    Resources = s.Resources.Select(r => new ResourceDto
                    {
                        Id = r.Id,
                        Title = r.Title,
                        Type = r.Type.ToString(),
                        Url = r.Url,
                        IsAffiliate = r.IsAffiliate
                    }).ToList()
                }).ToList()
        };
    }
}
