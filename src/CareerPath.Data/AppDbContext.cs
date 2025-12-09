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
    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserProfession> UserProfessions { get; set; }
    public DbSet<UserStepProgress> UserStepProgresses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // UserProfession (Many-to-Many User <-> Profession)
        modelBuilder.Entity<UserProfession>()
            .HasOne(up => up.User)
            .WithMany(u => u.UserProfessions)
            .HasForeignKey(up => up.UserId);

        modelBuilder.Entity<UserProfession>()
            .HasOne(up => up.Profession)
            .WithMany()
            .HasForeignKey(up => up.ProfessionId);

        // UserStepProgress (Many-to-Many User <-> RoadmapStep)
        modelBuilder.Entity<UserStepProgress>()
            .HasOne(usp => usp.User)
            .WithMany(u => u.UserStepProgresses)
            .HasForeignKey(usp => usp.UserId);

        modelBuilder.Entity<UserStepProgress>()
            .HasOne(usp => usp.RoadmapStep)
            .WithMany()
            .HasForeignKey(usp => usp.RoadmapStepId);
    }
}
