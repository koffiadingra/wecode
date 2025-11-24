<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class RegisterUser extends FormRequest
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
            'name'=> 'required',
            'email'=> 'required|unique:users,email',
            'password'=> 'required|string|min:6',
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
        return[
            'name.required' => 'Un nom doit etre fourni',
            'email.required' => 'Une adresse email doit etre fourni',
            'email.unique' => 'Cette adresse mail existe déjà',
            'password.requierd' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
        ];
    }
}
