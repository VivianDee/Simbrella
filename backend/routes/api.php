<?php

use App\Enums\TokenAbility;
use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//User preference 
Route::middleware(['VerifyApiKey'])->group(function () {


    // Authentication Group
    Route::prefix("auth")->group(function () {
        
        Route::post("/login", [AuthenticationController::class, "login"]);
        Route::post("/register", [AuthenticationController::class, "register"]);

        //Account Recovery
        Route::prefix("recover-account")->group(function () {
            Route::post("/send-otp", [AuthenticationController::class, "sendOtp"]);
            Route::post("/change-password", [AuthenticationController::class, "recoverAccount"]);
        });


        // Routes for Authenticated Users with API Access Ability
        Route::middleware([
            "auth:sanctum",
            "ability:" . TokenAbility::ACCESS_API->value,
        ])->group(function () {
            Route::post("/logout", [AuthenticationController::class, "logout"]);
            Route::post("/change-password", [AuthenticationController::class, "changePassword"]);
        });

    });




    // Routes for Authenticated Users with API Access Ability
    Route::middleware([
        "auth:sanctum",
        "ability:" . TokenAbility::ACCESS_API->value,
    ])->group(function () {

    });
});
