using Microsoft.EntityFrameworkCore;
using CareerPath.Core.Entities;

namespace CareerPath.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Profession> Professions { get; set; }
    public DbSet<RoadmapStep> RoadmapSteps { get; set; }
    public DbSet<Resource> Resources { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Optional: Fluent API configurations for more complex setups
        // For now, Data Annotations in Entities are sufficient.
    }
}
