<?php 

namespace App\Modules\TaskModule;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\ResponseHelper;

class TaskModule
{
    // List of all Tasks or show Task by ID
    public function showUserTasks(Request $request)
    {
        try {

            $task_id = $request->route('task_id');

            // Retrieve user tasks based on user ID
            $tasks = $task_id ? Task::findOrFail($task_id) : Task::where('assigned_to', $request->user()->id)->orderBy('created_at', 'desc')->get();

            if (!$tasks) {
                return ResponseHelper::notFound(
                    message: "Task(s) not Found"
                );
            }

            return ResponseHelper::success(
                message: "Tasks retrieved successfully",
                data: $tasks->load('user')->toArray() ?? []
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Create a new Task
    public function createTask(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "name" => "required|string|max:255",
                "description" => "nullable|string",
                "project_id" => "nullable|exists:projects,id",
                ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Create task
            $task = Task::create([
                "name" => $request->name,
                "description" => $request->description,
                "project_id" => $request->project_id,
                "assigned_to" => $request->user()->id,
            ]);

            if (!$task) {
                return ResponseHelper::error(
                    message: "Task creation failed"
                );
            }

            return ResponseHelper::success(
                message: "Task created successfully"
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Update Task
    public function updateTask(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "task_id" => "required|exists:tasks,id",
                "name" => "sometimes|string|max:255",
                "description" => "nullable|string",
                "project_id" => "sometimes|nullable|exists:projects,id", 
                "assigned_to" => "sometimes|exists:users,id", 
                "status" => "sometimes|in:pending,in_progress,completed",
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Find the task by ID
            $task = Task::findOrFail($request->task_id);

            // Update task fields
            $task->update($request->only(['name', 'description', 'project_id', 'assigned_to', 'status']));

            return ResponseHelper::success(
                message: "Task updated successfully",
                data: $task->load('user')->toArray() ?? []
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Update Task
    public function toggleTaskStatus(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "task_id" => "required|exists:tasks,id",
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Find the task by ID
            $task = Task::findOrFail($request->task_id);

            // Update task fields
            $task->update([
                "status" => $task->status === "completed" ? "pending" : "completed"
            ]);

            return ResponseHelper::success(
                message: "Task updated successfully",
                data: [
                    "status" => $task->status
                ]
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Delete Task
    public function deleteTask(Request $request)
    {
        try {
            $id = $request->route('task_id');
            
            // Find the task by ID
            $task = Task::findOrFail($id);

            if (!$task) {
                return ResponseHelper::notFound(
                    message: "Task not Found"
                );
            }

            // Delete the task
            $task->delete();

            return ResponseHelper::success(
                message: "Task deleted successfully"
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }
}