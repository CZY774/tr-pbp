<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reseps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kunjungan_id')->constrained('kunjungans')->onDelete('cascade');
            $table->foreignId('dokter_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('apoteker_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('obat_id')->constrained('obats')->onDelete('cascade');
            $table->integer('jumlah_obat');
            $table->string('dosis', 100)->nullable();
            $table->text('aturan_pakai')->nullable();
            $table->decimal('harga_obat', 10, 2);
            $table->decimal('total_harga', 10, 2);
            $table->enum('status_resep', ['menunggu', 'diproses', 'selesai'])->default('menunggu');
            $table->timestamp('tanggal_resep')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reseps');
    }
};
