<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Obat;
use App\Models\Pasien;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create users
        User::create([
            'username' => 'admin',
            'email' => 'admin@hospital.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'nama_lengkap' => 'Administrator',
            'no_telepon' => '08123456789',
        ]);

        User::create([
            'username' => 'dr_budi',
            'email' => 'budi@hospital.com',
            'password' => Hash::make('password'),
            'role' => 'dokter',
            'nama_lengkap' => 'Dr. Budi Santoso',
            'no_telepon' => '08123456790',
        ]);

        User::create([
            'username' => 'apt_sari',
            'email' => 'sari@hospital.com',
            'password' => Hash::make('password'),
            'role' => 'apoteker',
            'nama_lengkap' => 'Apt. Sari Wulandari',
            'no_telepon' => '08123456791',
        ]);

        // Create obats
        Obat::create([
            'kode_obat' => 'OBT001',
            'nama_obat' => 'Paracetamol 500mg',
            'jenis_obat' => 'Tablet',
            'satuan' => 'Strip',
            'harga_satuan' => 5000,
            'stok' => 100,
        ]);

        Obat::create([
            'kode_obat' => 'OBT002',
            'nama_obat' => 'Amoxicillin 500mg',
            'jenis_obat' => 'Kapsul',
            'satuan' => 'Strip',
            'harga_satuan' => 15000,
            'stok' => 50,
        ]);

        Obat::create([
            'kode_obat' => 'OBT003',
            'nama_obat' => 'OBH Sirup',
            'jenis_obat' => 'Sirup',
            'satuan' => 'Botol',
            'harga_satuan' => 25000,
            'stok' => 30,
        ]);

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
