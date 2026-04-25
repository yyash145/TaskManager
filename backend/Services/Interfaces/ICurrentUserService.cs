using System.Security.Claims;

namespace backend.Services.Interfaces;
public interface ICurrentUserService
{
    Guid UserId { get; }
}
