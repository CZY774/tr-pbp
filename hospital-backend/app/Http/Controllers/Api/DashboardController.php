<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Kunjungan;
use App\Models\Pasien;
use App\Models\Resep;
use App\Http\Controllers\Controller;

/*
 * GATAU INI BUAT APA
 * KAYAKNYA NGGA KEPAKE
 * SOALNYA DI ROUTES GA DIPANGGIL
 * 
 * makasi ndrew usahanya
 */
class DashboardController extends Controller
{
    //
    public function stats(Request $request)
    {
        try {
            $totalPasien = Pasien::count();
            $kunjunganHariIni = Kunjungan::whereDate('tanggal_kunjungan', now()->toDateString())->count();
            $kunjunganMenunggu = Kunjungan::where('status_kunjungan', 'menunggu')->count();
            $resepMenunggu = Resep::where('status_resep', 'menunggu')->count();

            return response()->json([
                'total_pasien' => $totalPasien,
                'kunjungan_hari_ini' => $kunjunganHariIni,
                'kunjungan_menunggu' => $kunjunganMenunggu,
                'resep_menunggu' => $resepMenunggu,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
