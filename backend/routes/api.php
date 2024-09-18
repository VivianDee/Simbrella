<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//User preference 
Route::middleware(['VerifyApiKey'])->group(function () {


    // Auth Group
    Route::prefix("auth")->group(function () {
        Route::post("/login", [AuthenticationController::class, "login"]);
        Route::post("/register", [AuthenticationController::class, "register"]);
        Route::post("/change-password", [AuthenticationController::class, "changePassword"]);
    });

    
});
