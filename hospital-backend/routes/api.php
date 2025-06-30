<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ObatController;
use App\Http\Controllers\Api\ResepController;
use App\Http\Controllers\Api\PasienController;
use App\Http\Controllers\Api\KunjunganController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Pasien routes
    Route::apiResource('pasiens', PasienController::class);
    
    // Kunjungan routes
    Route::apiResource('kunjungans', KunjunganController::class);
    
    // Obat routes
    Route::apiResource('obats', ObatController::class);
    
    // Resep routes
    Route::apiResource('reseps', ResepController::class);
    
    // User routes
    Route::apiResource('users', UserController::class);
    
    // Additional routes for dashboard
    Route::get('/dashboard/stats', function () {
        return response()->json([
            'total_pasiens' => \App\Models\Pasien::count(),
            'kunjungan_hari_ini' => \App\Models\Kunjungan::whereDate('tanggal_kunjungan', today())->count(),
            'kunjungan_menunggu' => \App\Models\Kunjungan::where('status_kunjungan', 'menunggu')->count(),
            'resep_menunggu' => \App\Models\Resep::where('status_resep', 'menunggu')->count(),
        ]);
    });

    // Public route to get all users with role = dokter
    Route::get('/dokters', function () {
        $dokters = \App\Models\User::where('role', 'dokter')
            ->where('is_active', true)
            ->get(['id', 'nama_lengkap', 'role']); // ambil kolom aman
        return response()->json($dokters);
    });

    // Public route to get all users with role = apoteker
    Route::get('/apotekers', function () {
        $apotekers = \App\Models\User::where('role', 'apoteker')
            ->where('is_active', true)
            ->get(['id', 'nama_lengkap', 'role']); // ambil kolom aman
        return response()->json($apotekers);
    });

});

// Public routes for testing
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// // Public routes for testing getalluser
// Route::get('/getAllUsers', function () {
//     $users = \App\Models\User::all();
//     return response()->json($users);
// })->withoutMiddleware('auth:sanctum');

// // Public routes for testing get all dokters attribute
// Route::get('/getDokters', function () {
//     $dokters = \App\Models\User::where('role', 'dokter')->get();
//     return response()->json($dokters);
// })->withoutMiddleware('auth:sanctum');

/* Public routes yang berisikan riwayat pasien yang status_kunjungan = selesai.
 * Menampilkan nama pasien, tanggal kunjungan, keluhan pasien, nama dokter yang memeriksa, resep dan obat yang diberikan.
 * Ambil dari beberapa model yang berbeda sekaligus lalu direturn jadi json
 */
Route::get('/riwayat', function () {
    $riwayat = \App\Models\Kunjungan::with(['pasien', 'dokter', 'reseps.obat'])->where('status_kunjungan', 'selesai')->get();
    return response()->json($riwayat);
})->withoutMiddleware('auth:sanctum');