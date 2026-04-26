namespace backend.Models.Requests;
using backend.Domain.Enums;

public class UpdateTaskRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? DueDate { get; set; }
    public TaskStatus? Status { get; set; } = TaskStatus.InProgress;
    public string? Remarks { get; set; }
}