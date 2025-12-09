using CareerPath.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CareerPath.API.Controllers;

[Authorize]
[ApiController]
[Route("api/user-professions")]
public class UserProfessionsController : ControllerBase
{
    private readonly IUserProfessionService _service;

    public UserProfessionsController(IUserProfessionService service)
    {
        _service = service;
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) throw new UnauthorizedAccessException("User ID not found in token.");
        return Guid.Parse(userIdClaim.Value);
    }

    [HttpPost("{professionId}")]
    public async Task<IActionResult> FollowAndStart(Guid professionId)
    {
        try
        {
            var userId = GetUserId();
            await _service.FollowProfessionAsync(userId, professionId);
            return Ok(new { message = "Profession followed successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{professionId}")]
    public async Task<IActionResult> Unfollow(Guid professionId)
    {
        try
        {
            var userId = GetUserId();
            await _service.UnfollowProfessionAsync(userId, professionId);
            return Ok(new { message = "Profession unfollowed successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetMyProfessions()
    {
        try
        {
            var userId = GetUserId();
            var result = await _service.GetMyProfessionsAsync(userId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
