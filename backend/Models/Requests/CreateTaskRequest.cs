namespace backend.Models.Requests;

public class CreateTaskRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; } = false;
    public DateTime? DueDate { get; set; }
    public string? Status { get; set; }
    public string? Remarks { get; set; }
}