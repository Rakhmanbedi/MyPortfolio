<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMe extends Model
{
    protected $fillable = ['first_name','last_name','email','number','message'];

    use HasFactory;
}
