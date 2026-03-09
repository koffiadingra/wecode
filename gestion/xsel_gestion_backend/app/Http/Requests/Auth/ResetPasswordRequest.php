<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'email'    => 'required|email|max:255',
            'otp'      => 'required|digits:6',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'       => 'L\'adresse email est requise.',
            'email.email'          => 'Veuillez entrer une adresse email valide.',

            'otp.required'         => 'Le code OTP est requis.',
            'otp.digits'           => 'Le code OTP doit contenir exactement 6 chiffres.',

            'password.required'    => 'Le mot de passe est requis.',
            'password.min'         => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed'   => 'La confirmation du mot de passe ne correspond pas.',
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