<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('about_mes', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->text('about');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('about_mes');
    }
};
