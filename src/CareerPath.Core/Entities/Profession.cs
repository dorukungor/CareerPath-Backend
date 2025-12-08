using System.ComponentModel.DataAnnotations;

namespace CareerPath.Core.Entities;

public class Profession
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string Slug { get; set; } = string.Empty;

    public decimal AvgSalary { get; set; }

    [MaxLength(50)]
    public string DifficultyLevel { get; set; } = string.Empty; // Easy, Medium, Hard

    // Navigation Property
    public ICollection<RoadmapStep> RoadmapSteps { get; set; } = new List<RoadmapStep>();
}
