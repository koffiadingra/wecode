<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class OTPService
{
    private const OTP_EXPIRES_MINUTES = 10;

    
    public function generateOTP(): array
    {
        $otp = (string) random_int(100000, 999999);

        return [
            'otp'            => $otp,                                           
            'otp_hash'       => Hash::make($otp),                              
            'otp_expires_at' => Carbon::now()->addMinutes(self::OTP_EXPIRES_MINUTES),
        ];
    }

    public function verifyOTP(string $email, string $otp): ?User
    {
        $user = User::where('email', $email)
            ->whereNotNull('otp')
            ->where('otp_expires_at', '>', Carbon::now())
            ->first();

        if (!$user || !Hash::check($otp, $user->otp)) {
            return null;
        }

        return $user;
    }

    
    public function verifyOTPAndVerifyEmail(string $email, string $otp): ?User
    {
        $user = $this->verifyOTP($email, $otp);

        if ($user) {
            $user->update([
                'email_verified_at' => Carbon::now(),
            ]);
        }

        return $user;
    }

    
    public function clearOTP(User $user): void
    {
        $user->update([
            'otp'            => null,
            'otp_expires_at' => null,
        ]);
    }

    public function getExpiresInMinutes(): int
    {
        return self::OTP_EXPIRES_MINUTES;
    }
}