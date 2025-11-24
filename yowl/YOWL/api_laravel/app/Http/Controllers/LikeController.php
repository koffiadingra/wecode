<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use App\Models\Like;

class LikeController extends Controller
{
    public function like(Comments $comment){
        $liker = auth()->user();

        $liker->likes()->attach($comment);
        return back();
    }
    public function unlike(Comments $comment){
        $liker = auth()->user();

        $liker->likes()->detach($comment);
        return back();
    }
}
