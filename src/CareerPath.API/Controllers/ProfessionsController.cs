using CareerPath.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CareerPath.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfessionsController : ControllerBase
{
    private readonly IProfessionService _service;

    public ProfessionsController(IProfessionService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        // Token'dan UserId'yi al (eğer varsa)
        Guid? userId = null;
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var parsedId))
        {
            userId = parsedId;
        }

        var result = await _service.GetByIdAsync(id, userId);
        if (result == null) return NotFound();
        return Ok(result);
    }
}
