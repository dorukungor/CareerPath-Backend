namespace CareerPath.Core.DTOs;

public class ProfessionDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public decimal AvgSalary { get; set; }
    public string DifficultyLevel { get; set; } = string.Empty;
    public List<RoadmapStepDto> RoadmapSteps { get; set; } = new();
}
