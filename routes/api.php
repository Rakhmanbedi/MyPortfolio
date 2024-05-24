<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\MySkill;
use App\Http\Resources\MySkillResource;
use App\Http\Controllers\MySkillController;
use App\Models\AboutMe;
use App\Http\Controllers\AboutMeController;
use App\Http\Resources\AboutMeResource;
use App\Models\MyPortfolio;
use App\Http\Controllers\MyPortfolioController;
use App\Http\Resources\MyPortfolioResource;
use App\Models\ContactMe;
use App\Http\Controllers\ContactMeController;
use App\Http\Resources\ContactMeResource;

Route::get('/posts', function (){
    return PostResource::collection(Post::all());
});

Route::get('/post/{id}', function ($id){
    return new PostResource(Post::findOrFail($id));
});

Route::post('/post', [PostController::class, 'store']);
Route::put('/post/{id}', [PostController::class, 'update']);
Route::delete('/post/{id}', [PostController::class, 'destroy']);

Route::get('/skills', function (){
    return MySkillResource::collection(MySkill::all());
});

Route::get('/skill/{id}', function ($id){
    return new MySkillResource(MySkill::findOrFail($id));
});

Route::post('/skill', [MySkillController::class, 'store']);
Route::put('/skill/{id}', [MySkillController::class, 'update']);
Route::delete('/skill/{id}', [MySkillController::class, 'destroy']);

//----------------------------------------------------------------------------

Route::get('/about_me', function (){
    return AboutMeResource::collection(AboutMe::all());
});

Route::get('/about/{id}', function ($id){
    return new AboutMeResource(AboutMe::findOrFail($id));
});

Route::post('/about', [AboutMeController::class, 'store']);
Route::put('/about/{id}', [AboutMeController::class, 'update']);
Route::delete('/about/{id}', [AboutMeController::class, 'destroy']);

//--------------------------------------------------------------------------------

//----------------------------------------------------------------------------

Route::get('/my_portfolio', function (){
    return MyPortfolioResource::collection(MyPortfolio::all());
});

Route::get('/portfolio/{id}', function ($id){
    return new MyPortfolioResource(MyPortfolio::findOrFail($id));
});

Route::post('/portfolio', [MyPortfolioController::class, 'store']);
Route::put('/portfolio/{id}', [MyPortfolioController::class, 'update']);
Route::delete('/portfolio/{id}', [MyPortfolioController::class, 'destroy']);

//--------------------------------------------------------------------------------


Route::get('/contacts', function (){
    return ContactMeResource::collection(ContactMe::all());
});

Route::get('/contact/{id}', function ($id){
    return new ContactMeResource(ContactMe::findOrFail($id));
});

Route::post('/contact', [ContactMeController::class, 'store']);
//Route::put('/contact/{id}', [ContactMeController::class, 'update']);
Route::delete('/contact/{id}', [ContactMeController::class, 'destroy']);

//--------------------------------------------------------------------------------


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
