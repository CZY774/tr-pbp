<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ResepController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Resep routes
    Route::apiResource('reseps', ResepController::class);
});

// Public routes for testing
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});