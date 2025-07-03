<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Profile routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::apiResource('users', UserController::class);

    // Public route to get all users with role = dokter
    Route::get('/dokters', function () {
        $dokters = \App\Models\User::where('role', 'dokter')
            ->where('is_active', true)
            ->get(['id', 'nama_lengkap', 'role']);
        return response()->json($dokters);
    });

    // Public route to get all users with role = apoteker
    Route::get('/apotekers', function () {
        $apotekers = \App\Models\User::where('role', 'apoteker')
            ->where('is_active', true)
            ->get(['id', 'nama_lengkap', 'role']);
        return response()->json($apotekers);
    });

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/profile/change-password', [AuthController::class, 'changePassword']);
});

// Forgot Password route
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

// Public routes for testing
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});