<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MySkill extends Model
{
    protected $fillable = ['photo','title','description'];
    use HasFactory;
}
