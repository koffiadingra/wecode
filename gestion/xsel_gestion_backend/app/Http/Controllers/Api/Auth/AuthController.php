<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginUserRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
// use App\Http\Resources\User\AuthResource;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        $validated = $request->validated();
        // dd($validated);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
        ]);
        // dd($user);
         $user->assignRole('user');

        $token = $user->createToken('auth_token')->plainTextToken;

        $authData = [
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ];

        // return new AuthResource($authData);
        return new SuccessResource([
            'message' => 'Inscription réussie',
            'data' => $user,
            'status_code' => 201,
        ]);
    }

   public function login(LoginUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return new ErrorResource([
                'message' => 'Invalid credentials',
                'status_code' => 401,
            ]);
        }

        $rememberMe = isset($validated['remember_me']) && $validated['remember_me'];

        $expiresAt = $rememberMe
            ? now()->addDays(30)
            : now()->addHours(8);

        $token = $user->createToken(
            'auth_token',
            ['*'],
            $expiresAt
        )->plainTextToken;

        $authData = [
            'user'       => $user,
            'token'      => $token,
            'token_type' => 'Bearer',
            'expires_at' => $expiresAt->toDateTimeString(), 
        ];

        return new SuccessResource([
            'status'  => 'success',
            'message' => 'login success',
            'data'    => $authData,
        ]);
    }

    public function logout(Request $request)
    {
        /** @var \Laravel\Sanctum\HasApiTokens $user */
         $user = $request->user();

        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }
        
        return new SuccessResource([
            'message' => 'Logged out successfully',
        ]);
    }

    // The user() function retrieves the authenticated user's profile data using their Bearer token.

    public function user(Request $request)
    {
        return new SuccessResource([
            'message' => 'User data retrieved successfully',
            'data' => new UserResource($request->user()),
        ]);
    }

    public function refreshToken(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $newToken = $request->user()->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $newToken,
            'token_type' => 'Bearer',
        ]);
    }

}
// $token = $user->createToken('auth_token');

// return $token;
