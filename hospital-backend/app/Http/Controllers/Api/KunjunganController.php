<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kunjungan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'keluhan' => 'nullable|string',
            'biaya_konsultasi' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Validasi dokter role
        $dokter = User::find($request->dokter_id);
        if ($dokter->role !== 'dokter') {
            return response()->json(['error' => 'User is not a doctor'], 422);
        }

        $kunjungan = Kunjungan::create($request->all());
        $kunjungan->load(['pasien', 'dokter']);
        
        return response()->json($kunjungan, 201);
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
