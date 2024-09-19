<?php

namespace App\Http\Controllers;

use App\Modules\ProjectModule\ProjectModule;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public $projectModule;

    public function __construct(ProjectModule $projectModule)
    {
        $this->projectModule = $projectModule;
    }

    // List all projects or show project by ID
    public function showUserProjects(Request $request)
    {
        return $this->projectModule->showUserProjects($request);
    }

    // Create a new project
    public function createProject(Request $request)
    {
        return $this->projectModule->createProject($request);
    }

    // Update project
    public function updateProject(Request $request)
    {
        return $this->projectModule->updateProject($request);
    }

    // Delete project
    public function deleteProject(Request $request)
    {
        return $this->projectModule->deleteProject($request);
    }
}
