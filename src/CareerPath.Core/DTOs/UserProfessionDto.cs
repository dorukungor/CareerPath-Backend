namespace CareerPath.Core.DTOs;

public class UserProfessionDto
{
    public Guid ProfessionId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public double ProgressPercentage { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime StartedAt { get; set; }
}
