<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\LogUserRequest;
use App\Http\Requests\RegisterUser;
use App\Models\Users;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // SIGN UP USER
    public function register(RegisterUser $request){
        try {
            $user = new Users();
            $user->name = $request ->name;
            $user->email = $request ->email;
            $user->password = Hash::make($request ->password, [
                'rounds' => 12,
            ]);
            $user->admin = 0;
            $user -> save();

            return response()->json([
                'status_code' => 200,
                'status_message' => 'Utilisateur enregistré.',
                'user'=>$user
            ]);
        } catch(Exception $e){
            return response()->json($e);
        }

    }

    // SIGN IN
    public function login(LogUserRequest $request){
        if(auth()->attempt($request->only(['email', 'password']))){
            $user = auth()->user();
            $token = $user->createToken('MY_KEY_AXEL')->plainTextToken;

            return response()->json([
            'status_code'=> 200,
            'status_message'=> 'Utilisateur Connecté',
            'user'=> $user,
            'token'=> $token

            ]);
            // dd($user);
        }else{
            return response()->json([
            'status_code'=> 403,
            'status_message'=> 'Information non valide',

            ]);
        }
    }

    // DELETE USER
    public function delete(Users $user ,$id){
        //  dd($user);
        $user = Users::find($id);
        if($user){
            $user->delete();

            return response()->json([
                'status_code'=> 200,
                'status_message'=> 'Utilisateur supprimé.',
                'data' => $user
            ]);
        }else{
            return response()->json([
            'status_code'=> 403,
            'status_message'=> 'Information non valide',
            ]);

        }
    }

    // LIST USERS
    public function users_list(){
        try {

            return response()->json([
                'status_code'=> 200,
                'status_message'=> 'Les utilisateurs ont été récupérés.',
                'data' => Users::all()
            ]);

        }catch(Exception $e){
            return response()->json($e);
        }
    }

    // UPDATE USER
    public function update(EditUserRequest $request, $id){
        try {
            // dd($id);
            $user = Users::find($id);
            // dd($user);
            $user->name = $request ->name;
            $user->email = $request ->email;
            $user->password = Hash::make($request ->password, [
                'rounds' => 12,
            ]);
            $user->save();

            return response()->json([
                'status_code'=> 200,
                'status_message'=> 'Utilisateur à été modifié.',
                'data' => $user
            ]);


        } catch(Exception $e){
            return response()->json($e);
        }

    }

     // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'status_code' => 200,
            'status_message' => 'Déconnexion réussie'
        ]);
    }
     // Show user
    public function show(Users $user ,$id)
    {   
        $user = Users::find($id);
        try {
            return response()->json([
                'status_code'=> 200,
                'status_message'=> 'Utilisateur récupéré.',
                'data' => $user
            ]);

        }catch(Exception $e){
            return response()->json($e);
        }
    }
}
