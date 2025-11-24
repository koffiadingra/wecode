<?php

namespace App\Http\Controllers\Api;

use App\Models\Comments;
use App\Http\Requests\CreateCommentsRequest;
use App\Http\Requests\UpdateCommentsRequest;
use App\Http\Controllers\Controller;
use Exception;

class CommentsController extends Controller
{

    //////function who  Show all comments///////////
    public function index(){
        return response()->json(Comments::all());
        $comments = comments::paginate(5);
        return view('comments.index', ['comments' => $articles]);

    }

    public function filtrage($id_post){
        return response()->json(Comments::where("post_id", $id_post)->get());
    }

    //////function who add a comment///////////
    public function store(CreateCommentsRequest $request){

        try{
            //dd($request);
            $comment = new Comments();
            $comment->comment = $request->comment;
            $comment->user_id = $request->user_id;
            $comment->post_id = $request->post_id;
            $comment->save();
            return response()->json([
                'status_code' => 200,
                'status_message' => 'Le commentaire a été ajouté',
                'data' => $comment
            ]);
        }catch(Exception $e){
            return response()->json($e);
        }
    }

    //////function who update a comment///////////
    public function update(UpdateCommentsRequest $request, $id){
        try{
            $comment = Comments::find($id);
            $comment -> comment = $request-> comment;
            $comment -> save();
            return response()->json([
                'status_code' => 200,
                'status_message' => 'Le commentaire a été modifié',
                'data' => $comment
            ]);
        }catch(Exception $e){
            return response()->json($e);
        }
    }

    //////function who delete a comment///////////
    public function delete($id){
        try{

            $comment = Comments::find($id);
            if($comment){
                $comment -> delete();
                return response()->json([
                    'status_code' => 200,
                    'status_message' => 'Le commentaire a été supprimé',
                    'data' => $comment
                ]);
            }else{
                return response()->json([
                    'status_code' => 402,
                    'status_message' => 'Le commentaire est introuvable',
                ]);
            }
        }catch(Exception $e){
            return response()->json($e);
        }
    }
}
