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
        
        // Helper to generate placeholder description if missing
        string GetDefaultDescription(string title) => 
            $@"
### {title} Hakkında
Bu adım, kariyer yolculuğunuzda kritik bir öneme sahiptir. {title}, modern yazılım geliştirme dünyasında sıkça karşılaşılan ve uzmanlaşılması gereken temel konulardan biridir.

### Neler Öğreneceksiniz?
- Temel kavramlar ve terminoloji
- En iyi uygulamalar (Best Practices)
- Gerçek dünya senaryoları
- Sık karşılaşılan hatalar ve çözümleri

Bu yetkinliği kazanmak sizi sektörde bir adım öne taşıyacaktır. Aşağıdaki kaynakları dikkatlice incelemenizi ve uygulama yapmanızı öneririz.";

        // Helper to generate default resources
        List<Resource> GetDefaultResources(string title) => new List<Resource>
        {
            new() { Title = $"{title} - Kapsamlı Rehber (Medium)", Url = "https://medium.com/topic/programming", Type = ResourceType.Article },
            new() { Title = $"{title} Temelleri (YouTube)", Url = "https://www.youtube.com/results?search_query=" + Uri.EscapeDataString(title), Type = ResourceType.Video },
            new() { Title = $"{title} Masterclass (Udemy)", Url = "https://www.udemy.com/courses/search/?q=" + Uri.EscapeDataString(title), Type = ResourceType.Course, IsAffiliate = true }
        };

        // 1. Wipe existing data for clean start (Development only)
        // We delete professions which cascades to steps and resources
        var existingProfessions = await context.Professions.ToListAsync();
        if (existingProfessions.Any())
        {
            context.Professions.RemoveRange(existingProfessions);
            await context.SaveChangesAsync();
        }

        // 2. Create Backend Developer Profession
        var backend = new Profession
        {
            Id = Guid.NewGuid(),
            Title = "Backend Developer",
            Slug = "backend-developer",
            AvgSalary = 75000,
            DifficultyLevel = "Medium"
        };

        var backendSteps = new List<RoadmapStep>
        {
            new() 
            { 
                ProfessionId = backend.Id, 
                Title = "C# Fundamentals", 
                Summary = "C# is a modern, object-oriented, and type-safe programming language.",
                Description = @"C# (pronounced 'See Sharp') is a modern, object-oriented, and type-safe programming language. C# enables developers to build many types of secure and robust applications that run in .NET. C# has its roots in the C family of languages and will be immediately familiar to C, C++, Java, and JavaScript programmers.

### Why C#?
C# is the primary language for .NET development. It is versatile, capable of building:
- **Web Applications**: Using ASP.NET Core
- **Desktop Applications**: Using Windows Presentation Foundation (WPF) or WinForms
- **Mobile Apps**: Using Xamarin or .NET MAUI
- **Cloud Services**: Azure Functions and microservices
- **Games**: Using the Unity game engine

### Key Features
1. **Type Safety**: Prevents type errors at compile time.
2. **Garbage Collection**: Automatic memory management.
3. **Asynchronous Programming**: Built-in support for async/await patterns.
4. **LINQ**: Language Integrated Query for querying data from different sources.

Mastering C# is the first and most critical step in your journey as a .NET Backend Developer.", 
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
                Description = @"Veri, modern dünyanın petrolüdür. SQL (Structured Query Language) ise bu petrolü çıkarıp işleyen makinedir. 

### SQL Nedir?
SQL, ilişkisel veritabanlarını yönetmek ve tasarlamak için kullanılan standart bir dildir. Bir Backend geliştirici olarak, uygulamanızın verilerini nasıl saklayacağınızı, güncelleyeceğinizi ve sorgulayacağınızı bilmek zorundasınız.

### Özellikler ve Kavramlar
- **Relational Databases (RDBMS)**: Verilerin tablolar halinde tutulduğu ve birbirleriyle ilişkilendirildiği sistemlerdir (PostgreSQL, MySQL, SQL Server).
- **CRUD Operasyonları**: Create (Oluştur), Read (Oku), Update (Güncelle), Delete (Sil).
- **Normalization**: Veri tekrarını önlemek ve veritabanı bütünlüğünü sağlamak için yapılan düzenlemeler.
- **Indexing**: Sorgu performansını artırmak için kullanılan yapılar.
- **Transactions (ACID)**: Veri bütünlüğünü garanti altına alan işlem blokları.

SQL bilmeden iyi bir Backend Developer olmak imkansızdır. ORM (Object-Relational Mapping) araçları (Entity Framework gibi) işinizi kolaylaştırsa da, alt tarafta dönen SQL'i anlamak performans optimizasyonu için kritiktir.", 
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
                Description = @"ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected apps.

### Building APIs
APIs (Application Programming Interfaces) are the glue that holds the modern web together. With ASP.NET Core, you can build powerful RESTful APIs that serve data to web clients, mobile apps, and other services.

### Key Concepts
- **Controllers & Actions**: Define endpoints.
- **Dependency Injection**: Built-in support for loose coupling.
- **Middleware**: Pipeline for handling requests and responses.
- **Routing**: Mapping URLs to code.
- **Model Binding**: Automatically mapping request data to C# objects.

Start building your first API today!",
                OrderIndex = 3, 
                MustKnow = true,
                Resources = new List<Resource>
                {
                    new() { Title = "Build a Web API with ASP.NET Core", Url = "https://learn.microsoft.com/en-us/training/modules/build-web-api-aspnet-core/", Type = ResourceType.Documentation },
                     new() { Title = ".NET API Tutorial", Url = "https://www.youtube.com/results?search_query=.net+web+api", Type = ResourceType.Video }
                }
            },
            new()
            {
                ProfessionId = backend.Id,
                Title = "Authentication & Security",
                OrderIndex = 4,
                MustKnow = true
            },
            new()
            {
                ProfessionId = backend.Id,
                Title = "Microservices Architecture",
                OrderIndex = 5,
                MustKnow = false
            }
        };

        // Fill missing fields for Backend
        foreach (var step in backendSteps)
        {
            if (string.IsNullOrEmpty(step.Summary)) step.Summary = "Bu adım kariyeriniz için kritik öneme sahiptir. Temel kavramları öğrenerek sağlam bir başlangıç yapın.";
            if (string.IsNullOrEmpty(step.Description)) step.Description = GetDefaultDescription(step.Title);
            if (step.Resources == null || !step.Resources.Any()) step.Resources = GetDefaultResources(step.Title);
        }

        await context.Professions.AddAsync(backend);
        await context.RoadmapSteps.AddRangeAsync(backendSteps);


        // 3. Create Frontend Developer Profession
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
            new() { ProfessionId = frontend.Id, Title = "JavaScript", Summary = "Logic of web", Description = "Validations, DOM manipulation.", OrderIndex = 2, MustKnow = true },
            new() { ProfessionId = frontend.Id, Title = "React", OrderIndex = 3, MustKnow = true },
            new() { ProfessionId = frontend.Id, Title = "Advanced CSS (Tailwind)", OrderIndex = 4, MustKnow = false }
        };

        // Fill missing fields for Frontend
        foreach (var step in frontendSteps)
        {
            if (string.IsNullOrEmpty(step.Summary)) step.Summary = "Bu adım, frontend dünyasının temel taşlarından biridir.";
             // Ensure description uses placeholder if short or empty (our manual ones above are short, let's keep them but fill the purely empty ones)
            if (string.IsNullOrEmpty(step.Description)) step.Description = GetDefaultDescription(step.Title);
             // Or if description is too short, maybe replace? Lets just handle empty for now as requested.
             
            if (step.Resources == null || !step.Resources.Any()) step.Resources = GetDefaultResources(step.Title);
        }

        await context.Professions.AddAsync(frontend);
        await context.RoadmapSteps.AddRangeAsync(frontendSteps);

        await context.SaveChangesAsync();
    }
}

