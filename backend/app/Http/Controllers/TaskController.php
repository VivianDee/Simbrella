<?php

namespace App\Http\Controllers;

use App\Modules\TaskModule\TaskModule;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public $taskModule;

    public function __construct(TaskModule $taskModule)
    {
        $this->taskModule = $taskModule;
    }

    // List of all Tasks or show Task by ID
    public function showUserTasks(Request $request)
    {
        return $this->taskModule->showUserTasks($request);
    }

    // Create a new Task
    public function createTask(Request $request)
    {
        return $this->taskModule->createTask($request);
    }

    // Update Task
    public function updateTask(Request $request)
    {
        return $this->taskModule->updateTask($request);
    }

    // Delete Task
    public function deleteTask(Request $request)
    {
        return $this->taskModule->deleteTask($request);
    }
}
