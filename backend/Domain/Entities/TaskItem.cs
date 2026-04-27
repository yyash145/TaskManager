namespace backend.Domain.Entities;
using backend.Domain.Enums;

public class TaskItem
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public DateTime? DueDate { get; private set; }
    public bool IsCompleted { get; private set; }
    public TaskStatus? Status { get; private set; } = TaskStatus.Pending;
    public string? Remarks { get; private set; }
    public Guid UserId { get; private set; }

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
        TaskStatus status,
        string? remarks,
        Guid userId)
    {
        Title = title;
        Description = description;
        IsCompleted = isCompleted;
        DueDate = dueDate;
        Status = status;
        Remarks = remarks;

        UserId = userId;
        CreatedBy = userId;
        UpdatedBy = userId;
        CreatedOn = DateTime.UtcNow;
        UpdatedOn = DateTime.UtcNow;
    }

    public void Update(string title,
        string? description,
        bool isCompleted,
        DateTime? dueDate,
        TaskStatus status,
        string? remarks,
        Guid userId)
    {
        Title = title;
        Description = description;
        IsCompleted = isCompleted;
        DueDate = dueDate;
        Status = status;
        Remarks = remarks;

        UpdatedBy = userId;
        UpdatedOn = DateTime.UtcNow;
    }
}