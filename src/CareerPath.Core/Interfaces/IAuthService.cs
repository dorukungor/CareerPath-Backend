using CareerPath.Core.DTOs;
using System.Threading.Tasks;

namespace CareerPath.Core.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
}
