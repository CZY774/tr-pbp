<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resep;
use App\Models\Obat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResepController extends Controller
{
    //
    public function index()
    {
        $reseps = Resep::with(['kunjungan.pasien', 'dokter', 'apoteker', 'obat'])
                       ->orderBy('tanggal_resep', 'desc')
                       ->get();
        return response()->json($reseps);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kunjungan_id' => 'required|exists:kunjungans,id',
            'dokter_id' => 'required|exists:users,id',
            'obat_id' => 'required|exists:obats,id',
            'jumlah_obat' => 'required|integer|min:1',
            'dosis' => 'nullable|string|max:100',
            'aturan_pakai' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $obat = Obat::findOrFail($request->obat_id);
        
        // Check stock
        if ($obat->stok < $request->jumlah_obat) {
            return response()->json(['error' => 'Insufficient stock'], 422);
        }

        $resep = new Resep($request->all());
        $resep->harga_obat = $obat->harga_satuan;
        $resep->save();

        // Update stock
        $obat->decrement('stok', $request->jumlah_obat);

        $resep->load(['kunjungan.pasien', 'dokter', 'obat']);
        return response()->json($resep, 201);
    }

    public function show($id)
    {
        $resep = Resep::with(['kunjungan.pasien', 'dokter', 'apoteker', 'obat'])->findOrFail($id);
        return response()->json($resep);
    }

    public function update(Request $request, $id)
    {
        $resep = Resep::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status_resep' => 'required|in:menunggu,diproses,selesai',
            'apoteker_id' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $resep->update($request->all());
        $resep->load(['kunjungan.pasien', 'dokter', 'apoteker', 'obat']);
        
        return response()->json($resep);
    }

    public function destroy($id)
    {
        $resep = Resep::findOrFail($id);
        
        // Return stock
        $resep->obat->increment('stok', $resep->jumlah_obat);
        
        $resep->delete();
        return response()->json(['message' => 'Resep deleted successfully']);
    }
}
