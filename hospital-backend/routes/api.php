<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KunjunganController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Kunjungan routes
    Route::apiResource('kunjungans', KunjunganController::class);
    
    // Additional routes for dashboard
    Route::get('/dashboard/stats', function () {
        return response()->json([
            'total_pasiens' => \App\Models\Pasien::count(),
            'kunjungan_hari_ini' => \App\Models\Kunjungan::whereDate('tanggal_kunjungan', today())->count(),
            'kunjungan_menunggu' => \App\Models\Kunjungan::where('status_kunjungan', 'menunggu')->count(),
            'resep_menunggu' => \App\Models\Resep::where('status_resep', 'menunggu')->count(),
        ]);
    });

    Route::get('/riwayat', function () {
        $riwayat = \App\Models\Kunjungan::with(['pasien', 'dokter', 'reseps.obat'])->where('status_kunjungan', 'selesai')->get();
        return response()->json($riwayat);
    });
});

// Public routes for testing
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});