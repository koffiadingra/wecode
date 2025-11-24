<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ads extends Model
{
    protected $fillable = [
        'id',
        'title',
        'category',
        'description',
        'condition',
        'price',
        'location',
        'image_url',
        'user_id',
    ];
}