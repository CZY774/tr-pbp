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
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'nama_lengkap' => 'required|string',
            'role' => 'required|in:admin,dokter,apoteker',
            'is_active' => 'boolean'
        ]);

        $validated['password'] = bcrypt($validated['password']);

        return User::create($validated);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Prevent updating is_active by themselves
        if (auth()->id() == $id && $request->has('is_active')) {
            return response()->json(['error' => 'You cannot update your own is_active'], 403);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users,username,'.$id,
            'nama_lengkap' => 'required',
            'role' => 'required|in:admin,dokter,apoteker',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(['username', 'nama_lengkap', 'role', 'is_active']);
        
        if ($request->has('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroy($id)
    {
        // Check if the user is the last admin
        $user = User::findOrFail($id);
        if ($user->role === 'admin' && User::where('role', 'admin')->count() === 1) {
            return response()->json(['message' => 'Cannot delete the last admin user'], 400);
        }

        $user = User::findOrFail($id);
        $user->update(['is_active' => false]);
        $user->delete();
        return response()->json(['message' => 'User deactivated successfully']);
    }
}
