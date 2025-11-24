<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LikeController;

use App\Http\Controllers\Api\CommentsController;
use App\Http\Controllers\Api\LinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//////////////////////////////////////////////////////////////////////
//Create route of comments

//get the list of all comment

/*

Don't forget to put api before the first slash.

*/
Route::get('/comments', [CommentsController::class, 'index']);

//Get comment by post
Route::get('/comments/{id_post}', [CommentsController::class, 'filtrage']);

//Add a new comment
Route::post('/comments/add', [CommentsController::class, 'store']);

//Update a comment
Route::put('/comments/edit/{id}', [CommentsController::class, 'update']);

//delete a comment
Route::delete('/comments/{id}', [CommentsController::class, 'delete']);

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////

//lien pour les posts

//lien pour les recupperation des post
Route::get('posts',[PostController::class,'index']);

Route::get('posts/{id}',[PostController::class,'filtrage']);

//ajout
Route::post('posts/create',[PostController::class,'store']);

//
Route::put('posts/edit/{posts}',[PostController::class,'update']);
//
Route::delete('posts/{posts}',[PostController::class,'destroy']);
// lien de base
Route::post('search',[PostController::class,'search']);
//////////////////////////////////////////////////////////////////


// Inscription
Route::post('/register', [UserController::class, 'register']);
// Login
Route::post('/login', [UserController::class, 'login']);
// Liste users
Route::get('/users', [UserController::class, 'users_list']);
// Delete user
Route::delete('/user/{id}', [UserController::class, 'delete']);
// Modifier user
Route::put('/user/edit/{id}', [UserController::class, 'update']);
// logout
Route::post('/logout', [UserController::class, 'logout']);
// Un seul User
Route::get('/show/{id}', [UserController::class, 'show']);

/////////////////////////////////////////////////////////////////

Route::post('/metaDonnees', [LinkController::class, 'index']);


Route::get('/comments/{id}/likes', [LikeController::class, 'index']);


Route::post('/comments/{comment}/like', [LikeController::class, 'like'])->name('comments.like');
Route::post('/comments/{comment}/unlike', [LikeController::class, 'unlike'])->name('comments.unlike');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->users();
});
