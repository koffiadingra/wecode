<?php

namespace App\Jobs;

use App\Mail\OTPMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    
    public function __construct(
        protected string $name,
        protected string $email,
        protected string $otp,
        protected string $purpose = 'verification'   
    ) {}

    public function handle(): void
    {
        Mail::to($this->email)->send(new OTPMail(
            otp: $this->otp,
            userName: $this->name,
            expiresIn: 10,
            purpose: $this->purpose              
        ));
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('SendMailJob failed', [
            'email'   => $this->email,
            'message' => $exception->getMessage(),
            'file'    => $exception->getFile(),
            'line'    => $exception->getLine(),
        ]);
    }
}