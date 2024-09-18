<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modules\AuthenticationModule\AuthenticationModule;

class AuthenticationController extends Controller
{
    public $authenticationModule;

    public function __construct(AuthenticationModule $authenticationModule) 
    {
        $this->authenticationModule = $authenticationModule;
    }


    // Handles login
    public function login(Request $request) {
        return $this->authenticationModule->login($request);
    }

    // Handles registeration
    public function register(Request $request) {
        return $this->authenticationModule->register($request);
    }

    // Handles Changeing of Password
    public function changePassword(Request $request) {
        return $this->authenticationModule->changePassword($request);
    }
}
