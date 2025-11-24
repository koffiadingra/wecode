<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdsController;
use Illuminate\Http\Request;



Route::post('/serch_home', [AdsController::class,'serach'])->name('home');
Route::get('/',[AdsController::class,'show'])->name('home');
Route::post('/', [AdsController::class,'filtrage_home'])->name('home');
Route::get('/HomeT',[AdsController::class,'index'])->name('index.ads');

Route::get('/admin',[AdsController::class,'admin_show'])->name('admin');


Route::post('/new_ads', [AdsController::class,'store'])->name('new_ads');

Route::get('/new_ads',function () {
    return view('new_ads');
})->name('nouveau');

Route::get('/my_ads',[AdsController::class,'my_show'])->name('my_ads');
Route::post('/my_ads_search', [AdsController::class,'my_serach'])->name('my_ads');
Route::post('/my_ads', [AdsController::class,'filtrage'])->name('my_ads');
Route::get('del/{ad}',[AdsController::class,'destroy'])->name('del');
Route::get('/edit/{ads}',[AdsController::class,'edit'])->name('edite');
Route::put('/{ads}',[AdsController::class,'update'])->name('update');


Route::get('/view',[AdsController::class,'index'])->name('index');


////////////////////////////////////////////////////////////////

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//////////////////////////////////////////////////////



require __DIR__.'/auth.php';


