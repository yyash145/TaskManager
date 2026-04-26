using backend.Models.Requests;
using backend.Models.Response;

namespace backend.Services.Interfaces;

public interface ITaskService
{
    Task<TaskResponse> CreateAsync(CreateTaskRequest request);
    Task<List<TaskResponse>> GetAllAsync();
    Task<bool> UpdateAsync(Guid id, UpdateTaskRequest request);
    Task<bool> DeleteAsync(Guid id);
    Task<TaskResponse?> GetByIdAsync(Guid id);
    Task<List<TaskResponse>> SearchAsync(SearchTaskRequest request);
}