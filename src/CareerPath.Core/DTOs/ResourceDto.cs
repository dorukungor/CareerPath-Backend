namespace CareerPath.Core.DTOs;

public class ResourceDto
{
    public Guid Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsAffiliate { get; set; }
}
