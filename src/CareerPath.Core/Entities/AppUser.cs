using System;
using System.Collections.Generic;

namespace CareerPath.Core.Entities;

public class AppUser
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation Properties
    public ICollection<UserProfession> UserProfessions { get; set; } = new List<UserProfession>();
    public ICollection<UserStepProgress> UserStepProgresses { get; set; } = new List<UserStepProgress>();
}
