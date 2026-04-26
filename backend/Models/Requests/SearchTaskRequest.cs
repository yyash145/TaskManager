namespace backend.Models.Requests;
using backend.Domain.Enums;

public class SearchTaskRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public TaskStatus? Status { get; set; }
    public bool? IsCompleted { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Remarks { get; set; }
}