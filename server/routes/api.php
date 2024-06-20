<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SolvedTestController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\userController;
use Spatie\Ignition\Contracts\Solution;

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


//NOTE - AUTH ROUTES
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [authController::class, 'logout']);
Route::post('register', [authController::class, 'register']);
Route::post('reset-password', [authController::class, 'resetPassword']);
Route::post('new-password/{token}', [authController::class, 'newPassword']);
Route::post('user-update/{id}', [userController::class, 'userUpdate']);
Route::post('user-password-update/{id}', [userController::class, 'userPasswordUpdate']);


//NOTE - TEST ROUTES
Route::get('all-test', [TestController::class, 'index']);
Route::post('create-test', [TestController::class, 'store']);
Route::get('my-tests/{id}', [TestController::class, 'getMyTests']);
Route::get('test-data/{id}', [TestController::class, 'getTestData']);
Route::post('update-test', [TestController::class, 'update']);
Route::delete('delete-test/{id}', [TestController::class, 'destroy']);
Route::get('bring-the-test/{id}', [TestController::class, 'bringTheTest']);


//NOTE - QUESTION ROUTES
Route::post('create-question', [QuestionController::class, 'store']);
Route::post('update-question', [QuestionController::class, 'update']);
Route::delete('delete-question/{id}', [QuestionController::class, 'destroy']);
Route::post('upload-image', [QuestionController::class, 'uploadImage']);
Route::post('delete-image', [QuestionController::class, 'deleteImage']);


//NOTE - ANSWER ROUTES
Route::delete('delete-answer/{id}', [AnswerController::class, 'destroy']);


//NOTE - SOLVED TEST ROUTES
Route::post('solved-test', [SolvedTestController::class, 'store']);
Route::get('get-solved-test/{id}', [SolvedTestController::class, 'getSolvedTest']);
Route::get('look-over/{id}', [SolvedTestController::class, 'lookOver']);


//NOTE - SETTINGS ROUTES
Route::get('settings', [SettingController::class, 'index']);
Route::post('save-settings', [SettingController::class, 'store']);


//NOTE - Private Teacher Route
Route::get('test-solvers/{id}', [TestController::class, 'testSolvers']);
Route::get('test-solver/{id}', [TestController::class, 'testSolver']);

//Note - Dashboard Route
Route::get('admin-dashboard', [DashboardController::class, 'AdminDashboard']);
Route::get('teacher-dashboard/{id}', [DashboardController::class, 'TeacherDashboard']);
Route::get('student-dashboard/{id}', [DashboardController::class, 'StudentDashboard']);


Route::get('home-page', [DashboardController::class, 'HomePage']);

// Route::get('openai', [SolvedTestController::class, 'index']);

Route::delete('delete-account/{id}', [userController::class, 'deleteAccount']);
