using CareerPath.Core.Entities;
using CareerPath.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerPath.Data.Services;

public class UserProgressService : IUserProgressService
{
    private readonly AppDbContext _context;

    public UserProgressService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ToggleProgressAsync(Guid userId, Guid stepId)
    {
        var existingProgress = await _context.UserStepProgresses
            .FirstOrDefaultAsync(usp => usp.UserId == userId && usp.RoadmapStepId == stepId);

        if (existingProgress != null)
        {
            // If exists, remove it (untoggle)
            _context.UserStepProgresses.Remove(existingProgress);
            await _context.SaveChangesAsync();
            return false; // Not completed anymore
        }
        else
        {
            // If not exists, add it (toggle on)
            var newProgress = new UserStepProgress
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                RoadmapStepId = stepId,
                CompletedAt = DateTime.UtcNow
            };

            await _context.UserStepProgresses.AddAsync(newProgress);
            await _context.SaveChangesAsync();
            return true; // Completed
        }
    }
}
