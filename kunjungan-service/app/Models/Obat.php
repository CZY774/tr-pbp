<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Obat extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'kode_obat', 'nama_obat', 'jenis_obat', 'satuan', 'harga_satuan', 'stok', 'is_active'
    ];

    protected $casts = [
        'harga_satuan' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function reseps()
    {
        return $this->hasMany(Resep::class);
    }
}
