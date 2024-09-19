<?php

namespace App\Modules\ProjectModule;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\ResponseHelper;
use App\Models\Team;
use Illuminate\Support\Facades\DB;
use App\Modules\TeamModule\TeamModule;

class ProjectModule
{
    // Lists all projects or Displays project by ID
    public function showUserProjects(Request $request)
    {
        try {
            // Get project ID
            $project_id = $request->route('project_id');

            // Get the authenticated user
            $user = $request->user();

            // Retrieve team IDs for the user
            $teamIds = $user->teams->pluck('id')->toArray();

            // Retrieve user projects based on user ID
            $projects = $project_id ? Project::findOrFail($project_id) : Project::whereIn('team_id', $teamIds)->get();

            return ResponseHelper::success(
                message: "Projects retrieved successfully",
                data: $projects->load('team', 'team.users')->toArray()
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Creates a new project
    public function createProject(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "name" => "required|string|max:255|unique:projects,name",
                "description" => "nullable|string",
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            DB::beginTransaction();

            // Create project
            $project = Project::create([
                "name" => $request->name,
                "description" => $request->description,
            ]);

            if (!$project) {
                DB::rollBack();
                return ResponseHelper::error(
                    message: "Project creation failed"
                );
            }

            $team = new TeamModule();
            $project_team = $team->createTeam($request);

            if ($project_team instanceof Team) {

                // Update project team
                $project->team_id = $project_team->id;
                $project->save();

                DB::commit();
                return ResponseHelper::success(
                    message: "Project created successfully",
                    data: $project->load('team', 'team.users')->toArray()
                );
            }

            $projectTeamData = $project_team->getData();
            DB::rollBack();
            return ResponseHelper::error(
                message: $projectTeamData->message,
                error: $projectTeamData->error
            );
        } catch (\Throwable $th) {
            DB::rollBack();
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Updates a project
    public function updateProject(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "project_id" => "required|exists:projects,id",
                "name" => "sometimes|nullable|string|max:255",
                "description" => "sometimes|nullable|string",
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Find the project by ID
            $project = Project::findOrFail($request->project_id);

            // Update project fields
            $project->update($request->only(['name', 'description']));

            return ResponseHelper::success(
                message: "Project updated successfully",
                data: $project->toArray()
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Deletes a project
    public function deleteProject(Request $request)
    {
        try {
            $id = $request->route('project_id');

            // Find the project by ID
            $project = Project::findOrFail($id);

            // Delete the project
            $project->delete();

            return ResponseHelper::success(
                message: "Project deleted successfully"
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }
}
