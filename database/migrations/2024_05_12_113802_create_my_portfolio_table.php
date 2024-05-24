<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('my_portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('url_name');
            $table->string('url')->nullable();
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('my_portfolios');
    }
};
