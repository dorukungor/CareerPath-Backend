using System;

namespace CareerPath.Core.Entities;

public class UserStepProgress
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public Guid RoadmapStepId { get; set; }
    public RoadmapStep RoadmapStep { get; set; } = null!;

    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
}
