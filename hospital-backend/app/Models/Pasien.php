<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pasien extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'no_rm', 'nik', 'nama_pasien', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'no_telepon'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    public function kunjungans()
    {
        return $this->hasMany(Kunjungan::class);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($pasien) {
            if (empty($pasien->no_rm)) {
                $pasien->no_rm = 'RM' . str_pad(static::count() + 1, 6, '0', STR_PAD_LEFT);
            }
        });
    }
}
