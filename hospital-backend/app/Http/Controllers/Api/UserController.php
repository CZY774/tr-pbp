<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
    public function index(Request $request)
    {
        try {
            $query = User::query();
            
            if ($request->has('role')) {
                $query->where('role', $request->role);
            }
            
            $users = $query->get();
            return response()->json($users);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // Validasi data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'no_telepon' => 'required|string',
            'password' => 'required|string|min:6',
            'nama_lengkap' => 'required|string',
            'role' => 'required|in:admin,dokter,apoteker',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ambil data yang sudah divalidasi
        $validated = $validator->validated();

        // Enkripsi password
        $validated['password'] = bcrypt($validated['password']);

        // Simpan user
        $user = User::create($validated);

        return response()->json($user, 201);
    }


    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Cegah edit super admin oleh admin lain
        if ($user->id == 1 && auth()->id() != 1) {
            return response()->json(['error' => 'You cannot modify the super admin'], 403);
        }

        // Cegah user update is_active miliknya sendiri
        if (auth()->id() == $id && $request->has('is_active')) {
            return response()->json(['error' => 'You cannot update your own is_active'], 403);
        }

        $validator = Validator::make($request->all(), [
            'role' => 'required|in:admin,dokter,apoteker',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $user->update($data);

        return response()->json($user);
    }



    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Cegah hapus super admin oleh admin lain
        if ($user->id == 1 && auth()->id() != 1) {
            return response()->json(['error' => 'You cannot delete the super admin'], 403);
        }

        // Cegah hapus admin terakhir
        if ($user->role === 'admin' && User::where('role', 'admin')->count() === 1) {
            return response()->json(['message' => 'Cannot delete the last admin user'], 400);
        }

        // Cegah user hapus dirinya sendiri (opsional, kalau mau)
        if (auth()->id() == $id) {
            return response()->json(['error' => 'You cannot delete your own account'], 403);
        }

        $user->update(['is_active' => false]);
        $user->delete();

        return response()->json(['message' => 'User deactivated successfully']);
    }

}
