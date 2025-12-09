using CareerPath.Core.DTOs;
using CareerPath.Core.Entities;
using CareerPath.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareerPath.Data.Services;

public class UserProfessionService : IUserProfessionService
{
    private readonly AppDbContext _context;

    public UserProfessionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task FollowProfessionAsync(Guid userId, Guid professionId)
    {
        // Check if already followed
        var exists = await _context.UserProfessions
            .AnyAsync(up => up.UserId == userId && up.ProfessionId == professionId);
        
        if (exists) return; // Already followed, idmpotent

        var userProfession = new UserProfession
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ProfessionId = professionId,
            StartedAt = DateTime.UtcNow,
            IsCompleted = false
        };

        await _context.UserProfessions.AddAsync(userProfession);
        await _context.SaveChangesAsync();
    }

    public async Task UnfollowProfessionAsync(Guid userId, Guid professionId)
    {
        var userProfession = await _context.UserProfessions
            .FirstOrDefaultAsync(up => up.UserId == userId && up.ProfessionId == professionId);

        if (userProfession != null)
        {
            _context.UserProfessions.Remove(userProfession);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<UserProfessionDto>> GetMyProfessionsAsync(Guid userId)
    {
        var userProfessions = await _context.UserProfessions
            .Include(up => up.Profession)
            .Where(up => up.UserId == userId)
            .ToListAsync();

        var result = new List<UserProfessionDto>();

        foreach (var up in userProfessions)
        {
            // Calculate progress
            // 1. Get total steps for this profession
            // Note: Since RoadmapStep has ProfessionId, we can count directly
            var totalSteps = await _context.RoadmapSteps.CountAsync(s => s.ProfessionId == up.ProfessionId);
            
            // 2. Get completed steps by user for this profession
            // We need to join UserStepProgress with RoadmapStep to filter by ProfessionId
            var completedSteps = await _context.UserStepProgresses
                .Include(usp => usp.RoadmapStep)
                .CountAsync(usp => usp.UserId == userId && usp.RoadmapStep.ProfessionId == up.ProfessionId);

            double percentage = totalSteps == 0 ? 0 : (double)completedSteps / totalSteps * 100;

            result.Add(new UserProfessionDto
            {
                ProfessionId = up.ProfessionId,
                Title = up.Profession.Title,
                Slug = up.Profession.Slug,
                StartedAt = up.StartedAt,
                IsCompleted = up.IsCompleted,
                ProgressPercentage = Math.Round(percentage, 1)
            });
        }

        return result;
    }
}
