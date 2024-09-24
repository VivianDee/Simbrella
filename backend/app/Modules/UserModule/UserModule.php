<?php

namespace App\Modules\UserModule;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\ResponseHelper;

class UserModule
{
    // Get Authenticated User Details
    public function showUser(Request $request)
    {
        try {
            $user_id = $request->route('id');

            $user = $user_id ? User::findOrFail($user_id) : $request->user();
            

            if (!$user) {
                return ResponseHelper::notFound(
                    message: "User not found"
                );
            }

            return ResponseHelper::success(
                message: "User details retrieved successfully",
                data: $user->toArray() ?? []
            );
        } catch (\Throwable $th) {
            return ResponseHelper::internalServerError(
                message: "Internal Server Error",
                error: $th->getMessage()
            );
        }
    }
}
