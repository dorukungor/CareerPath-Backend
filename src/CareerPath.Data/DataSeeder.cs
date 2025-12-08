using CareerPath.Core.Entities;

namespace CareerPath.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (context.Professions.Any())
        {
            return; // Data already exists
        }

        var backend = new Profession
        {
            Id = Guid.NewGuid(),
            Title = "Backend Developer",
            Slug = "backend-developer",
            AvgSalary = 75000,
            DifficultyLevel = "Medium"
        };

        var frontend = new Profession
        {
            Id = Guid.NewGuid(),
            Title = "Frontend Developer",
            Slug = "frontend-developer",
            AvgSalary = 65000,
            DifficultyLevel = "Medium"
        };

        var backendSteps = new List<RoadmapStep>
        {
            new() { ProfessionId = backend.Id, Title = "C# Fundamentals", Description = "Learn basic syntax, types, and loops.", OrderIndex = 1, MustKnow = true },
            new() { ProfessionId = backend.Id, Title = "SQL Database", Description = "Understand relational databases and querying.", OrderIndex = 2, MustKnow = true },
            new() { ProfessionId = backend.Id, Title = ".NET Core Web API", Description = "Build RESTful APIs with ASP.NET Core.", OrderIndex = 3, MustKnow = true }
        };

        var frontendSteps = new List<RoadmapStep>
        {
            new() { ProfessionId = frontend.Id, Title = "HTML & CSS", Description = "Structure and style web pages.", OrderIndex = 1, MustKnow = true },
            new() { ProfessionId = frontend.Id, Title = "JavaScript", Description = "Validations, DOM manipulation, ES6+ features.", OrderIndex = 2, MustKnow = true },
            new() { ProfessionId = frontend.Id, Title = "React", Description = "Component based UI development.", OrderIndex = 3, MustKnow = true }
        };

        await context.Professions.AddRangeAsync(backend, frontend);
        await context.RoadmapSteps.AddRangeAsync(backendSteps);
        await context.RoadmapSteps.AddRangeAsync(frontendSteps);

        await context.SaveChangesAsync();
    }
}
