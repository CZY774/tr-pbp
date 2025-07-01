<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resep extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'kunjungan_id', 'dokter_id', 'apoteker_id', 'obat_id', 'jumlah_obat',
        'dosis', 'aturan_pakai', 'harga_obat', 'total_harga', 'status_resep', 'tanggal_resep'
    ];

    protected $casts = [
        'harga_obat' => 'decimal:2',
        'total_harga' => 'decimal:2',
        'tanggal_resep' => 'datetime',
    ];

    public function kunjungan()
    {
        return $this->belongsTo(Kunjungan::class);
    }

    public function dokter()
    {
        return $this->belongsTo(User::class, 'dokter_id');
    }

    public function apoteker()
    {
        return $this->belongsTo(User::class, 'apoteker_id');
    }

    public function obat()
    {
        return $this->belongsTo(Obat::class);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($resep) {
            $resep->total_harga = $resep->harga_obat * $resep->jumlah_obat;
        });

        static::updating(function ($resep) {
            $resep->total_harga = $resep->harga_obat * $resep->jumlah_obat;
        });
    }
}
