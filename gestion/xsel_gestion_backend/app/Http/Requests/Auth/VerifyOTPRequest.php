<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class VerifyOTPRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
            'otp'   => 'required|digits:6',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'L\'adresse email est requise.',
            'email.email'    => 'Veuillez entrer une adresse email valide.',
            'otp.required'   => 'Le code OTP est requis.',
            'otp.digits'     => 'Le code OTP doit contenir exactement 6 chiffres.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'status'  => 'error',
                'message' => 'Validation échouée',
                'errors'  => $validator->errors()
            ], 422)
        );
    }
}