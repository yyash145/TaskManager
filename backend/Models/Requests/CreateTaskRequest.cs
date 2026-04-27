using System.ComponentModel.DataAnnotations;
using backend.Domain.Enums;

namespace backend.Models.Requests;

public class CreateTaskRequest
{
    [Required]
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public Domain.Enums.TaskStatus? Status { get; set; } = Domain.Enums.TaskStatus.Pending;
    public string? Remarks { get; set; }
}