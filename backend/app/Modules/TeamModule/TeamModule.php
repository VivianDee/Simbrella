<?php

namespace App\Modules\TeamModule;

use App\Models\Team; // Import the Team model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\ResponseHelper;

class TeamModule
{
    // List of all Teams or show Team by ID
    public function showUsersTeams(Request $request)
    {
        try {
            // Retrieve teams associated with the authenticated user
            $teams = $request->user()->teams;

            if (!$teams) {
                return ResponseHelper::notFound(
                    message: "Team not found"
                );
            }

            return ResponseHelper::success(
                message: "Teams retrieved successfully",
                data: $teams->load('users')->toArray()
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Create a new Team
    public function createTeam(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "name" => "required|string|max:255|unique:teams,name",
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Create team
            $team = Team::create([
                "name" => $request->name,
            ]);

            if (!$team) {
                return ResponseHelper::error(
                    message: "Team creation failed"
                );
            }

            // Add authenticated user to the team
            $user = $request->user();
            $team->users()->attach($user->id);

            return $team->load('users');

        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Update Team
    public function updateTeam(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "team_id" => "required|exists:teams,id",
                "name" => "sometimes|required|string|max:255|unique:teams,name," . $request->user()->id,
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Find the team by ID
            $team = Team::findOrFail($request->team_id);

            // Update team fields
            $team->update($request->only(['name']));

            return ResponseHelper::success(
                message: "Team updated successfully"
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }

    // Delete Team
    public function deleteTeam(Request $request)
    {
        try {
            $id = $request->route('team_id');

            // Find the team by ID
            $team = Team::findOrFail($id);

            // Delete the team
            $team->delete();

            return ResponseHelper::success(
                message: "Team deleted successfully"
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }


    public function assignUserToTeam(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                "team_id" => "required|exists:teams,id",
                "user_id" => "required|exists:users,id",
            ]);

            // If validation fails, return an error response
            if ($validator->fails()) {
                return ResponseHelper::error(
                    message: "Validation failed",
                    error: $validator->errors()->toArray()
                );
            }

            // Find the team by ID
            $team = Team::findOrFail($request->team_id);

           // Add  user to the team
           $team->users()->attach($request->user_id);

            return ResponseHelper::success(
                message: "Team updated successfully",
                data: $team->load('users')->toArray()
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }
}
