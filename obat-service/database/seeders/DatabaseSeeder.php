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
    }
}
