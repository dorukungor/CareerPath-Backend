using System.Security.Claims;
using CareerPath.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerPath.API.Controllers;

[ApiController]
[Route("api/progress")]
[Authorize]
public class UserProgressController : ControllerBase
{
    private readonly IUserProgressService _progressService;

    public UserProgressController(IUserProgressService progressService)
    {
        _progressService = progressService;
    }

    [HttpPost("{stepId}")]
    public async Task<IActionResult> ToggleProgress(Guid stepId)
    {
        var userId = GetUserId();
        var isCompleted = await _progressService.ToggleProgressAsync(userId, stepId);
        return Ok(new { isCompleted });
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            throw new UnauthorizedAccessException("Invalid token");
        }
        return Guid.Parse(userIdClaim.Value);
    }
}
