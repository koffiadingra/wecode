<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\OTPController;
use App\Http\Controllers\Api\Auth\PasswordResetController;
use App\Http\Controllers\Api\ClientController;



Route::prefix('auth/')->group(function () {
    // Public routes
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // OTP routes
    Route::post('send-otp', [OTPController::class, 'sendOTP'])->middleware('guest');
    Route::post('verify-otp', [OTPController::class, 'verifyOTP'])->middleware('guest');

    // Password reset routes
    Route::post('forgot-password', [PasswordResetController::class, 'forgotPassword'])->middleware('guest');
    Route::post('reset-password', [PasswordResetController::class, 'resetPassword'])->middleware('guest');

    //refresh token
    Route::middleware('auth:sanctum')->post('refresh', [AuthController::class, 'refreshToken']);

});
    // Route::get('/user', [AuthController::class, 'user']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

Route::prefix('/client')->group(function () {
    Route::post('create', [ClientController::class, 'store'])->middleware('guest');
    Route::put('client_update/{id}', [ClientController::class, 'update'])->middleware('guest');
    Route::delete('delete_client/{id}', [ClientController::class, 'destroy'])->middleware('guest');
});

// Route::get('/clients', [ClientController::class, 'client']);