<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendOTPRequest;
use App\Http\Requests\Auth\VerifyOTPRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Jobs\SendMailJob;
use App\Models\User;
use App\Services\OTPService;

class OTPController extends Controller
{
    protected OTPService $otpService;

    public function __construct(OTPService $otpService)
    {
        $this->otpService = $otpService;
    }


    public function sendOTP(SendOTPRequest $request): SuccessResource
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        
        if (!$user) {
            return new SuccessResource([
                'message' => 'OTP envoyé verifier votre boite mail.',
                'data'    => [
                    'expires_in' => $this->otpService->getExpiresInMinutes(),
                ]
            ]);
        }

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
                'verification'
            );
        } catch (\Exception $e) {
            $this->otpService->clearOTP($user);

            return new SuccessResource([
                'message' => 'Une erreur est survenue. Veuillez réessayer dans quelques instants.',
            ]);
        }

        return new SuccessResource([
            'message' => 'Si cet email est enregistré, vous recevrez un OTP.',
            'data'    => [
                'expires_in' => $this->otpService->getExpiresInMinutes(),
                'email'      => $user->email,
            ]
        ]);
    }


    public function verifyOTP(VerifyOTPRequest $request): SuccessResource|ErrorResource
    {
        $validated = $request->validated();

        $user = $this->otpService->verifyOTPAndVerifyEmail(
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

        return new SuccessResource([
            'message' => 'Email vérifié avec succès'
        ]);
    }
}