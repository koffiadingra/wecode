<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\OTPController;
use App\Http\Controllers\Api\Auth\PasswordResetController;


Route::prefix('auth/')->group(function () {
    // Public routes
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // OTP routes
    Route::post('send-otp', [OTPController::class, 'sendOTP']);
    Route::post('verify-otp', [OTPController::class, 'verifyOTP']);

    // Password reset routes
    Route::post('forgot-password', [PasswordResetController::class, 'forgotPassword']);
    Route::post('reset-password', [PasswordResetController::class, 'resetPassword']);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});


// Route::prefix('auth')->as('auth.')->group(function () {
    
//   Route::post('login',[AuthController::class,'login'])->name('login');
// });

// Include Authentication Routes
// require __DIR__ . '/auth.php';