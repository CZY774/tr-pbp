<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kunjungan extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'no_antrian', 'pasien_id', 'dokter_id', 'tanggal_kunjungan', 'jam_kunjungan',
        'keluhan', 'diagnosis', 'tindakan', 'status_kunjungan', 'biaya_konsultasi'
    ];

    protected $casts = [
        'tanggal_kunjungan' => 'date',
        'jam_kunjungan' => 'datetime:H:i:s',
        'biaya_konsultasi' => 'decimal:2',
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function dokter()
    {
        return $this->belongsTo(User::class, 'dokter_id');
    }

    public function reseps()
    {
        return $this->hasMany(Resep::class);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($kunjungan) {
            if (empty($kunjungan->no_antrian)) {
                $today = now()->format('Ymd');
                $count = static::whereDate('tanggal_kunjungan', $kunjungan->tanggal_kunjungan)->count();
                $kunjungan->no_antrian = $today . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
            }
            if (empty($kunjungan->jam_kunjungan)) {
                $kunjungan->jam_kunjungan = now()->format('H:i:s');
            }
        });
    }
}
