<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Obat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObatController extends Controller
{
    //
    public function index()
    {
        $obats = Obat::where('is_active', true)->orderBy('nama_obat')->get();
        return response()->json($obats);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_obat' => 'required|string|max:20|unique:obats,kode_obat',
            'nama_obat' => 'required|string|max:100',
            'jenis_obat' => 'nullable|string|max:50',
            'satuan' => 'nullable|string|max:20',
            'harga_satuan' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $obat = Obat::create($request->all());
        return response()->json($obat, 201);
    }

    public function show($id)
    {
        $obat = Obat::findOrFail($id);
        return response()->json($obat);
    }

    public function update(Request $request, $id)
    {
        $obat = Obat::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'kode_obat' => 'required|string|max:20|unique:obats,kode_obat,' . $id,
            'nama_obat' => 'required|string|max:100',
            'jenis_obat' => 'nullable|string|max:50',
            'satuan' => 'nullable|string|max:20',
            'harga_satuan' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $obat->update($request->all());
        return response()->json($obat);
    }

    public function destroy($id)
    {
        $obat = Obat::findOrFail($id);
        $obat->update(['is_active' => false]);
        return response()->json(['message' => 'Obat deactivated successfully']);
    }
}
