using CareerPath.Core.DTOs;

namespace CareerPath.Core.Interfaces;

public interface IUserProfessionService
{
    Task FollowProfessionAsync(Guid userId, Guid professionId);
    Task UnfollowProfessionAsync(Guid userId, Guid professionId);
    Task<IEnumerable<UserProfessionDto>> GetMyProfessionsAsync(Guid userId);
}
