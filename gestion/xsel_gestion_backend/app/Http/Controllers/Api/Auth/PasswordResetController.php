<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\SendOTPRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Jobs\SendMailJob;
use App\Models\User;
use App\Services\OTPService;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    protected OTPService $otpService;

    public function __construct(OTPService $otpService)
    {
        $this->otpService = $otpService;
    }

    
    public function forgotPassword(SendOTPRequest $request): SuccessResource|ErrorResource
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        $otpData = $this->otpService->generateOTP();

        $user->update([
            'otp'            => $otpData['otp_hash'],
            'otp_expires_at' => $otpData['otp_expires_at'],
        ]);

        try {
            SendMailJob::dispatch(
                $user->name,
                $user->email,
                $otpData['otp'],
                'password_reset'
            );
        } catch (\Exception $e) {
            $this->otpService->clearOTP($user);

            return new ErrorResource([
                'message'    => 'Échec de l\'envoi de l\'email. Veuillez réessayer.',
                'error_code' => 'EMAIL_SEND_FAILED',
                'status_code' => 500
            ]);
        }

        return new SuccessResource([
            'message' => 'OTP envoyé avec succès sur votre adresse email',
            'data'    => [
                'expires_in' => $this->otpService->getExpiresInMinutes(),
                'email'      => $user->email,
            ]
        ]);
    }


    public function resetPassword(ResetPasswordRequest $request): SuccessResource|ErrorResource
    {
        $validated = $request->validated();

        $user = $this->otpService->verifyOTP(
            $validated['email'],
            $validated['otp']
        );

        if (!$user) {
            return new ErrorResource([
                'message'    => 'OTP invalide ou expiré',
                'status_code' => 400
            ]);
        }

        $this->otpService->clearOTP($user);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        $user->tokens()->delete();

        return new SuccessResource([
            'message' => 'Mot de passe réinitialisé avec succès. Veuillez vous reconnecter.'
        ]);
    }
}