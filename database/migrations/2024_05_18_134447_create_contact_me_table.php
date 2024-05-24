<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('contact_mes', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->bigInteger('number')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('contact_mes');
    }
};
