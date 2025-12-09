using System;

namespace CareerPath.Core.Entities;

public class UserProfession
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public Guid ProfessionId { get; set; }
    public Profession Profession { get; set; } = null!;

    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public bool IsCompleted { get; set; }
}
