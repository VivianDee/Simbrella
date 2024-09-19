<?php

namespace App\Http\Controllers;

use App\Modules\TeamModule\TeamModule;
use Illuminate\Http\Request;

class TeamController extends Controller
{

    public $teamModule;

    public function __construct(TeamModule $teamModule)
    {
        $this->teamModule = $teamModule;
    }

    // List of all Teams or show Team by ID
    public function showUsersTeams(Request $request)
    {
        return $this->teamModule->showUsersTeams($request);
    }

    // Create a new Team
    public function createTeam(Request $request)
    {
        return $this->teamModule->createTeam($request);
    }

    // Update Team
    public function updateTeam(Request $request)
    {
        return $this->teamModule->updateTeam($request);
    }

    // Delete Team
    public function deleteTeam(Request $request)
    {
        return $this->teamModule->deleteTeam($request);
    }

    // Assign a user to a team

    public function assignUserToTeam(Request $request)
    {
        return $this->teamModule->assignUserToTeam($request);
    }
}
