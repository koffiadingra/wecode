<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\posts;
use App\Models\Comments;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\Auth;
use App\Http\Requests\createPostRequest;
use App\Http\Requests\EditPostrequest;
use Exception;
use Illuminate\Support\Facades\DB;

class Postcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Posts::query();
        $perpage = 1;
        $page = $request->input('page',1);
        $search = $request->input('search');

        if($search){
            $query->whereRaw("post_url LIKE'%".$search."%'");
        }
        $total = $query->count();
        try{

            return response()->json([
            'status_code'=> 200,
            'status_message'=>' posts reccupperer',
            'data'=>Posts::all()
        ]);

        }catch(Exception $e){
            return response()->json($e);
        }
    }
    public function filtrage($id)
    {
        return response()->json(Posts::where("users_id", $id)->get());
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function search(Request $posts)
    {
// dd($posts->rechercher);
        $utilisateursAvecContacts = DB::table('posts')
        ->join('comments', 'posts.id', '=', 'comments.post_id')
        ->where("comments.comment", "LIKE", ['%' . $posts->rechercher . '%'])
        ->orWhere("posts.post_url", "LIKE", ['%' . $posts->rechercher . '%'])
        ->select('post_id as id', 'post_url', 'users_id')
        ->get();
        return $utilisateursAvecContacts;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(createPostRequest $request)
    {
        try{
        $posts = new posts();

        $posts->users_id = $request->users_id;
        $posts->post_url  = $request->post_url;

        $posts->save();

        return response()->json([
            'status_code'=> 200,
            'status_message'=>'le posts a ete ajouter',
            'data'=>$posts
        ]);
        }catch(Exception $e){
            return response()->json($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(posts $posts)
    {
        //return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditPostrequest $request,Posts $posts)
    {
        try{

        // $posts = Posts::find($posts);
        // dd($posts);
        $posts->users_id = $request->users_id;
        $posts->post_url  = $request->post_url;

        $posts->save();

        return response()->json([
            'status_code'=> 200,
            'status_message'=>'le posts a ete mis a jour',
            'data'=>$posts
        ]);
        }catch(Exception $e){
            return response()->json($e);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(posts $posts)
    {
        // dd($posts);
        try{
            $posts->delete();

             return response()->json([
            'status_code'=> 200,
            'status_message'=>'le posts a ete supprimer',
            'data'=>$posts
        ]);
        }catch(Exception $e){
            return response()->json($e);
        }
    }
}
