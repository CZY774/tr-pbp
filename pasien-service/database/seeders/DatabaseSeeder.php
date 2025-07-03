<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create sample pasiens
        Pasien::create([
            'no_rm' => 'RM000001',
            'nik' => '3273010101990001',
            'nama_pasien' => 'John Doe',
            'tanggal_lahir' => '1990-01-01',
            'jenis_kelamin' => 'L',
            'alamat' => 'Jl. Sudirman No. 123, Jakarta',
            'no_telepon' => '08123456792',
        ]);

        Pasien::create([
            'no_rm' => 'RM000002',
            'nik' => '3273010202850002',
            'nama_pasien' => 'Jane Smith',
            'tanggal_lahir' => '1985-02-02',
            'jenis_kelamin' => 'P',
            'alamat' => 'Jl. Thamrin No. 456, Jakarta',
            'no_telepon' => '08123456793',
        ]);
    }
}
