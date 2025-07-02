<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PasienController extends Controller
{
    //
    public function index()
    {
        $pasiens = Pasien::orderBy('created_at', 'desc')->get();
        return response()->json($pasiens);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_pasien' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'nik' => 'nullable|string|size:16|unique:pasiens,nik',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pasien = Pasien::create($request->all());
        return response()->json($pasien, 201);
    }

    public function show($id)
    {
        $pasien = Pasien::with('kunjungans.dokter')->findOrFail($id);
        return response()->json($pasien);
    }

    public function update(Request $request, $id)
    {
        $pasien = Pasien::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nama_pasien' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'nik' => 'nullable|string|size:16|unique:pasiens,nik,' . $id,
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pasien->update($request->all());
        return response()->json($pasien);
    }

    public function destroy($id)
    {
        $pasien = Pasien::findOrFail($id);
        $pasien->delete();
        return response()->json(['message' => 'Pasien deleted successfully']);
    }
}
