using System.ComponentModel.DataAnnotations;

namespace CareerPath.Core.Entities;

public class RoadmapStep
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ProfessionId { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Summary { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int OrderIndex { get; set; }

    public bool MustKnow { get; set; }

    // Navigation Properties
    public Profession? Profession { get; set; }
    public ICollection<Resource> Resources { get; set; } = new List<Resource>();
}
