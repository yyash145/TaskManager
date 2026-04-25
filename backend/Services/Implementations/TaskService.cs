using backend.Data;
using backend.Entities;
using backend.Models.Requests;
using backend.Models.Response;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Implementations;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;
    private readonly ICurrentUserService _currentUser;
    public TaskService(AppDbContext context, ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<TaskResponse> CreateAsync(CreateTaskRequest request)
    {
        var entity = new TaskItem(
            request.Title,
            request.Description,
            request.IsCompleted,
            request.DueDate,
            request.Status,
            request.Remarks,
            _currentUser.UserId
        );

        _context.Tasks.Add(entity);
        await _context.SaveChangesAsync();

        return Map(entity);
    }

    public async Task<List<TaskResponse>> GetAllAsync()
    {
        return await _context.Tasks
            .Select(t => Map(t))
            .ToListAsync();
    }

    public async Task<TaskResponse?> GetByIdAsync(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);
        return task == null ? null : Map(task);
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateTaskRequest request)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return false;

        task.Update(
            request.Title,
            request.Description,
            request.IsCompleted,
            request.DueDate,
            request.Status,
            request.Remarks,
            _currentUser.UserId
        );

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public static TaskResponse Map(TaskItem t) => new()
    {
        Id = t.Id,
        Title = t.Title,
        Description = t.Description,
        IsCompleted = t.IsCompleted
    };
}