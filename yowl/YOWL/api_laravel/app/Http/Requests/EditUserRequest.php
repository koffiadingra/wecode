<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class EditUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'email' ,
            'password' => 'string|min:6',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'=> false,
            'status_code'=> 422,
            'error'=> true,
            'message'=> 'Erreur de validation',
            'errorList'=> $validator ->errors(),
        ]));
    }

    public function messages()
    {
        return [
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',

            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
        ];
    }
}
