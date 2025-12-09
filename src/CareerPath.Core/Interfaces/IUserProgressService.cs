using System;
using System.Threading.Tasks;

namespace CareerPath.Core.Interfaces;

public interface IUserProgressService
{
    Task<bool> ToggleProgressAsync(Guid userId, Guid stepId);
}
