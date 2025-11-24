<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function likes(): HasMany{
        return $this->belongsToMany(Like::class, 'likes')->withTimestamps();
    }

    public function likesComment(Comments $comment){
        return $this->likes()->where('comment_id',$comment->id)->exists();
    }

}

use Illuminate\Database\Eloquent\Relations\HasMany;


