<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Kunjungan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
class KunjunganController extends Controller
{
    //
    public function index()
    {
        $kunjungans = Kunjungan::with(['pasien', 'dokter'])
                               ->orderBy('tanggal_kunjungan', 'desc')
                               ->orderBy('jam_kunjungan', 'desc')
                               ->get();
        return response()->json($kunjungans);
    }

    public function store(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'pasien_id' => 'required|exists:pasiens,id',
                'dokter_id' => 'required|exists:users,id',
                'tanggal_kunjungan' => 'required|date',
                'jam_kunjungan' => 'required',
                'keluhan' => 'nullable|string',
                'diagnosis' => 'nullable|string',
                'tindakan' => 'nullable|string',
                'biaya_konsultasi' => 'nullable|numeric|min:0',
                'status_kunjungan' => 'nullable|string|in:menunggu,selesai,batal',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $dokter = User::find($request->dokter_id);
            if (!$dokter || $dokter->role !== 'dokter') {
                return response()->json(['error' => 'User is not a doctor'], 422);
            }

            // ✅ Gunakan transaksi agar aman dari duplikasi
            DB::beginTransaction();
            try {
                $tanggal = Carbon::parse($request->tanggal_kunjungan)->format('Ymd');

                // Hitung antrian pada tanggal itu
                $count = Kunjungan::whereDate('tanggal_kunjungan', $request->tanggal_kunjungan)->count();
                $no_antrian = $tanggal . str_pad($count + 1, 3, '0', STR_PAD_LEFT);

                // Simpan data
                $data = $request->all();
                $data['no_antrian'] = $no_antrian;
                $data['status_kunjungan'] = $data['status_kunjungan'] ?? 'menunggu';

                $kunjungan = Kunjungan::create($data);
                DB::commit();

                $kunjungan->load(['pasien', 'dokter']);
                return response()->json($kunjungan, 201);
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json(['error' => 'Gagal menyimpan kunjungan: ' . $e->getMessage()], 500);
            }
        }


    public function show($id)
    {
        $kunjungan = Kunjungan::with(['pasien', 'dokter', 'reseps.obat'])->findOrFail($id);
        return response()->json($kunjungan);
    }

    public function update(Request $request, $id)
    {
        $kunjungan = Kunjungan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'diagnosis' => 'nullable|string',
            'tindakan' => 'nullable|string',
            'status_kunjungan' => 'required|in:menunggu,selesai,batal',
            'biaya_konsultasi' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kunjungan->update($request->all());
        $kunjungan->load(['pasien', 'dokter']);
        
        return response()->json($kunjungan);
    }

    public function destroy($id)
    {
        $kunjungan = Kunjungan::findOrFail($id);
        $kunjungan->delete();
        return response()->json(['message' => 'Kunjungan deleted successfully']);
    }
}
