using CareerPath.Core.Entities;
using CareerPath.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace CareerPath.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        // For development: Ensuring we are updating data to match new Rich Content structure
        // In production you typically wouldn't blindly delete.
        // But per USER request: "Veritabanını sıfırla ki yeni veriler yüklensin"
        
        // Let's check if the specific "Backend Developer" exists and remove it to re-seed?
        // Or blindly delete everything if it's development?
        // Let's do a smarter check. If "Backend Developer" exists, we'll remove it and its children to re-seed.
        
        var existingBackend = await context.Professions
            .Include(p => p.RoadmapSteps)
            .FirstOrDefaultAsync(p => p.Slug == "backend-developer");
            
        if (existingBackend != null)
        {
            context.Professions.Remove(existingBackend);
            await context.SaveChangesAsync();
        }

        var backend = new Profession
        {
            Id = Guid.NewGuid(),
            Title = "Backend Developer",
            Slug = "backend-developer",
            AvgSalary = 75000,
            DifficultyLevel = "Medium"
        };
        
        // Re-creating or finding Frontend is fine, let's keep it simple and just focus on rich content backend for now or recreate both.
        // Let's wipe Professions table for clean slate if allowed? 
        // Safer: Just re-seed Backend as it's the focus.
        
        // Wait, if I deleted Backend, I should re-add it.
        
        // Rich Content Roadmap Steps
        var backendSteps = new List<RoadmapStep>
        {
            new() 
            { 
                ProfessionId = backend.Id, 
                Title = "C# Fundamentals", 
                Summary = "C# is a modern, object-oriented, and type-safe programming language.",
                Description = "C# enables developers to build many types of secure and robust applications that run in .NET. It is heavily used in enterprise updates.", 
                OrderIndex = 1, 
                MustKnow = true,
                Resources = new List<Resource>
                {
                    new() { Title = "C# 101 Link", Url = "https://learn.microsoft.com/dotnet/csharp/", Type = ResourceType.Documentation },
                    new() { Title = "C# for Beginners (Video)", Url = "https://www.youtube.com/watch?v=GhQdlIFylQ8", Type = ResourceType.Video }
                }
            },
            new() 
            { 
                ProfessionId = backend.Id, 
                Title = "Veritabanı ve SQL", 
                Summary = "SQL, verinin dilidir. Backend için neden önemli olduğunu 2 dakikada okuyun.",
                Description = "Veri, modern dünyanın petrolüdür. SQL (Structured Query Language) ise bu petrolü çıkarıp işleyen makinedir. Bir Backend geliştirici olarak veriyi nasıl saklayacağınızı, güncelleyeceğinizi ve sorgulayacağınızı bilmek zorundasınız. İlişkisel veritabanları (PostgreSQL, SQL Server) yazılım dünyasının belkemiğidir. Transaction yönetimi, Indexing ve Normalizasyon konularına hakim olmalısınız.", 
                OrderIndex = 2, 
                MustKnow = true,
                Resources = new List<Resource>
                {
                    new() { Title = "PostgreSQL for Everybody (YouTube)", Url = "https://www.youtube.com/watch?v=qw--VYLpxG4", Type = ResourceType.Video },
                    new() { Title = "SQL Temelleri (Medium Makalesi)", Url = "https://medium.com/sql-basics", Type = ResourceType.Article },
                    new() { Title = "Komple SQL Kursu (Udemy)", Url = "https://www.udemy.com/course/sql-complete", Type = ResourceType.Course, IsAffiliate = true }
                }
            },
            new() 
            { 
                ProfessionId = backend.Id, 
                Title = ".NET Core Web API", 
                Summary = "Learn how to build scalable APIs with ASP.NET Core.",
                Description = "ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected apps.", 
                OrderIndex = 3, 
                MustKnow = true,
                Resources = new List<Resource>
                {
                    new() { Title = "Build a Web API with ASP.NET Core", Url = "https://learn.microsoft.com/en-us/training/modules/build-web-api-aspnet-core/", Type = ResourceType.Documentation }
                }
            }
        };

        await context.Professions.AddAsync(backend);
        await context.RoadmapSteps.AddRangeAsync(backendSteps);
        
        // Check Frontend: if not exists, create dummy
        if (!await context.Professions.AnyAsync(p => p.Title == "Frontend Developer"))
        {
             var frontend = new Profession
            {
                Id = Guid.NewGuid(),
                Title = "Frontend Developer",
                Slug = "frontend-developer",
                AvgSalary = 65000,
                DifficultyLevel = "Medium"
            };
            var frontendSteps = new List<RoadmapStep>
            {
                new() { ProfessionId = frontend.Id, Title = "HTML & CSS", Summary = "Building blocks of web", Description = "Structure and style web pages.", OrderIndex = 1, MustKnow = true },
                new() { ProfessionId = frontend.Id, Title = "JavaScript", Summary = "Logic of web", Description = "Validations, DOM manipulation.", OrderIndex = 2, MustKnow = true }
            };
            await context.Professions.AddAsync(frontend);
            await context.RoadmapSteps.AddRangeAsync(frontendSteps);
        }

        await context.SaveChangesAsync();
    }
}
