using backend.Models.Response;
using backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/task")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _service;

    public TasksController(ITaskService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskRequest request)
    {
        var result = await _service.CreateAsync(request);
        return Ok(ApiResponse<TaskResponse>
            .SuccessResponse(result, "Task created successfully"));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return result == null
            ? NotFound(ApiResponse<string>.FailureResponse("No Tasks found")) 
            : Ok(ApiResponse<List<TaskResponse>>.SuccessResponse(result));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _service.GetByIdAsync(id);
        return result == null
            ? NotFound(ApiResponse<string>.FailureResponse("Task not found")) 
            : Ok(ApiResponse<TaskResponse>.SuccessResponse(result));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTaskRequest request)
    {
        var updated = await _service.UpdateAsync(id, request);
        return updated 
            ? Ok(ApiResponse<string>.SuccessResponse("Record Updated successfully")) 
            : NotFound(new { message = "Task not found" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted 
            ? Ok(ApiResponse<string>.SuccessResponse("Deleted successfully")) 
            : NotFound(ApiResponse<string>.FailureResponse("Task not found"));
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] SearchTaskRequest request)
    {
        var result = await _service.SearchAsync(request);

        return Ok(ApiResponse<List<TaskResponse>>
            .SuccessResponse(result, "Tasks fetched successfully"));
    }
}