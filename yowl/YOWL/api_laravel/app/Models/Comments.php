<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comments extends Model
{
    use HasFactory;
    public function user(): BelongsTo{
        return $this->belongsTo(Users::class);
    }

    public function likes(): HasMany{
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }

   
}
