namespace backend.Entities;

public class TaskItem
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public bool IsCompleted { get; private set; }
    public DateTime? DueDate { get; private set; }
    public string? Status { get; private set; }
    public string? Remarks { get; private set; }

    public DateTime CreatedOn { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedOn { get; private set; } = DateTime.UtcNow;

    public Guid CreatedBy { get; private set; }
    public Guid UpdatedBy { get; private set; }

    // Required by EF
    public TaskItem() { }

    public TaskItem(
        string title,
        string? description,
        bool isCompleted,
        DateTime? dueDate,
        string? status,
        string? remarks,
        Guid userId)
    {
        Title = title;
        Description = description;
        IsCompleted = isCompleted;
        DueDate = dueDate;
        Status = status;
        Remarks = remarks;

        CreatedBy = userId;
        UpdatedBy = userId;
    }

    public void Update(string title,
        string? description,
        bool isCompleted,
        DateTime? dueDate,
        string? status,
        string? remarks,
        Guid userId)
    {
        Title = title;
        Description = description;
        IsCompleted = isCompleted;
        DueDate = dueDate;
        Status = status;
        Remarks = remarks;

        UpdatedOn = DateTime.UtcNow;
        UpdatedBy = userId;
    }
}