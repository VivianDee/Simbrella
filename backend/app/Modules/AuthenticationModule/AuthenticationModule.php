<?php 

namespace App\Modules\AuthenticationModule;

use App\Modules\AuthenticationModule\Services\accountCreationService;
use App\Modules\AuthenticationModule\Services\ChangePasswordService;
use App\Modules\AuthenticationModule\Services\signInService;
use Illuminate\Http\Request;

class AuthenticationModule
{
    public $signInService;
    public $accountCreationService;
    public $changePasswordService;

    // Constructor to initialize services
    public function __construct(signInService $signInService, accountCreationService $accountCreationService, ChangePasswordService $changePasswordService) {
        $this->signInService = $signInService;
        $this->accountCreationService = $accountCreationService;
        $this->changePasswordService = $changePasswordService;
    }

     // Handles login
    public function login(Request $request) {
        return $this->signInService->login($request);
    }

     // Handles registeration
    public function register(Request $request) {
        return $this->accountCreationService->register($request);
    }

     // Handles Changeing of Password
    public function changePassword(Request $request) {
        return $this->changePasswordService->changePassword($request);
    }

}