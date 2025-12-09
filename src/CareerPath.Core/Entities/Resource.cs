using System.ComponentModel.DataAnnotations;

namespace CareerPath.Core.Entities;

public class Resource
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid StepId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public CareerPath.Core.Enums.ResourceType Type { get; set; }

    [Required]
    [MaxLength(500)]
    public string Url { get; set; } = string.Empty;

    public bool IsAffiliate { get; set; }

    public int ClickCount { get; set; }

    // Navigation Property
    public RoadmapStep? Step { get; set; }
}
