<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Posts;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;


class LikeController extends Controller
{
    
    public function storePost(Posts $posts)
    {
        $user = Auth::user();

        if (!$posts->likes()->where('user_id', $user->id)->exists()) {
            $posts->likes()->create(['user_id' => $user->id]);
            return response()->json(['message' => 'Post liké avec succès!'], 201);
        }

        return response()->json(['message' => 'Vous avez déjà liké ce post.'], 409);
    }

    public function destroyPost(Posts $posts)
    {
        $user = Auth::user();
        $posts->likes()->where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Like retiré du post avec succès!']);
    }

  
    public function storeComment(Comment $comment)
    {
        $user = Auth::user();

        if (!$comment->likes()->where('user_id', $user->id)->exists()) {
            $comment->likes()->create(['user_id' => $user->id]);
            return response()->json(['message' => 'Commentaire liké avec succès!'], 201);
        }

        return response()->json(['message' => 'Vous avez déjà liké ce commentaire.'], 409);
    }

    public function destroyComment(Comment $comment)
    {
        $user = Auth::user();
        $comment->likes()->where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Like retiré du commentaire avec succès!']);
    }
}
