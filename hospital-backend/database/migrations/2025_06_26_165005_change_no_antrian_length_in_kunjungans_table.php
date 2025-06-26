<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('kunjungans', function (Blueprint $table) {
            $table->string('no_antrian', 20)->change(); // ganti panjang jadi 20
        });
    }

    public function down()
    {
        Schema::table('kunjungans', function (Blueprint $table) {
            $table->string('no_antrian', 10)->change(); // rollback ke 10
        });
    }
};

