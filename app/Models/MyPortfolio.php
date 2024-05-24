<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyPortfolio extends Model
{
    protected $fillable = ['image','title','description','url','url_name'];
    use HasFactory;
}
