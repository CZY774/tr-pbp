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
    }
}
