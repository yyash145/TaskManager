using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class RegisterRequest
{
    public string? Username {get; set;}
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}    
