using backend.Models.Requests;
using backend.Models.Response;
using backend.Domain.Entities;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using backend.Services.Interfaces;


namespace backend.Services.Implementations;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    // ✅ REGISTER
    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var existingEmail = await _context.Users
            .AnyAsync(u => u.Email == request.Email);

        if (existingEmail)
            throw new Exception("Email already exists");

        // 🔴 Handle username (auto-generate if missing)
        var username = string.IsNullOrWhiteSpace(request.Username)
            ? await GenerateUniqueUsername()
            : request.Username;

        // 🔴 Check duplicate username
        var existingUsername = await _context.Users
            .AnyAsync(u => u.Username == username);

        if (existingUsername)
            throw new Exception("Username already exists");
        
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User(username, request.Email, passwordHash);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return await GenerateTokens(user);
    }

    // ✅ LOGIN
    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        return await GenerateTokens(user);
    }

    // ✅ REFRESH TOKEN API
    public async Task<AuthResponse> RefreshTokenAsync(Guid userId, string refreshToken)
    {
        var user = await _context.Users.FindAsync(userId);

        if (user == null || user.RefreshTokenHash == null)
            throw new UnauthorizedAccessException("Invalid refresh token");

        var isValid = BCrypt.Net.BCrypt.Verify(refreshToken, user.RefreshTokenHash);

        if (!isValid)
            throw new UnauthorizedAccessException("Invalid refresh token");

        return await GenerateTokens(user); // rotate tokens
    }

    // 🔥 CORE TOKEN GENERATOR (MAIN LOGIC)
    private async Task<AuthResponse> GenerateTokens(User user)
    {
        var accessToken = GenerateJwtToken(user);
        var refreshToken = Guid.NewGuid().ToString(); // like crypto.randomUUID()

        user.RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(refreshToken);

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    // ✅ JWT TOKEN
    private string GenerateJwtToken(User user)
    {
        var keyString = _config["Jwt:Key"]
            ?? throw new InvalidOperationException("JWT Key is missing in configuration");
        var key = Encoding.UTF8.GetBytes(keyString);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var creds = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<string> GenerateUniqueUsername()
    {
        string username;
        bool exists;

        do
        {
            username = $"user_{Guid.NewGuid().ToString("N").Substring(0, 8)}";

            exists = await _context.Users
                .AnyAsync(u => u.Username == username);

        } while (exists);

        return username;
    }
}