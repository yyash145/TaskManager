namespace backend.Models.Requests;

public class SearchTaskRequest
{
    public string? Title { get; set; }
    public string? Status { get; set; }
    public bool? IsCompleted { get; set; }

    // Optional filters (bonus)
    public DateTime? DueDateFrom { get; set; }
    public DateTime? DueDateTo { get; set; }
}