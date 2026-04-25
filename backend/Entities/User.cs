namespace backend.Entities;

public class User
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public string Username { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }

    public DateTime CreatedOn { get; private set; } = DateTime.UtcNow;

    private User() { }

    public User(string username, string email, string passwordHash)
    {
        Username = username;
        Email = email;
        PasswordHash = passwordHash;
    }
}