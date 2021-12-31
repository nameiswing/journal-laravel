<?php

use App\Http\Controllers\TasksController;
// use App\Http\Controllers\\ThoughtsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/tasks', [TasksController::class, 'index']);
Route::post('/add-task', [TasksController::class, 'store']);
Route::put('/update-item/{id}', [TasksController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
