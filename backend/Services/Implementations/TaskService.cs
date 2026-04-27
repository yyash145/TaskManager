using backend.Data;
using backend.Domain.Enums;
using backend.Domain.Entities;
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
            request.DueDate,
            request.Status ?? Domain.Enums.TaskStatus.InProgress,
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
            .Where(t => t.UserId == _currentUser.UserId)
            .Select(t => Map(t))
            .ToListAsync();
    }

    public async Task<TaskResponse?> GetByIdAsync(Guid id)
    {
        var task = await _context.Tasks.
            FirstOrDefaultAsync(t => t.Id == id && t.UserId == _currentUser.UserId);
        return task == null ? null : Map(task);
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateTaskRequest request)
    {
        var task = await _context.Tasks.
            FirstOrDefaultAsync(t => t.Id == id && t.UserId == _currentUser.UserId);
        
        if (task == null) return false;

        task.Update(
            request.Title,
            request.Description,
            request.DueDate,
            request.Status ?? Domain.Enums.TaskStatus.InProgress,
            request.Remarks,
            _currentUser.UserId
        );

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var task = await _context.Tasks.
            FirstOrDefaultAsync(t => t.Id == id && t.UserId == _currentUser.UserId);
        if (task == null) return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<TaskResponse>> SearchAsync(SearchTaskRequest request)
    {
        var query = _context.Tasks
            .Where(t => t.UserId == _currentUser.UserId)
            .AsQueryable();

        // Filter by Title (case-insensitive)
        if (!string.IsNullOrWhiteSpace(request.Title))
        {
            query = query.Where(t =>
                t.Title.ToLower().Contains(request.Title.ToLower()));
        }

        // Filter by Status
        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }

        // Filter by DueDate range
        if (request.DueDate.HasValue)
        {
            query = query.Where(t => t.DueDate >= request.DueDate.Value);
        }

        return await query
            .OrderByDescending(t => t.CreatedOn)
            .Select(t => Map(t))
            .ToListAsync();
    }

    public static TaskResponse Map(TaskItem t) => new()
    {
        Id = t.Id,
        Title = t.Title,
        Description = t.Description,
        DueDate = t.DueDate,
        Status = t.Status ?? Domain.Enums.TaskStatus.InProgress,
        Remarks = t.Remarks,
        
        CreatedOn = t.CreatedOn,
        CreatedBy = t.CreatedBy,
        UpdatedOn = t.UpdatedOn,
        UpdatedBy = t.UpdatedBy
    };
}