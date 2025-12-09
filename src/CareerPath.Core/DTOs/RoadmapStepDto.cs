namespace CareerPath.Core.DTOs;

public class RoadmapStepDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int OrderIndex { get; set; }
    public bool MustKnow { get; set; }
    public List<ResourceDto> Resources { get; set; } = new();
}
