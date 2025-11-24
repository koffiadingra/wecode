<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ads;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AdsController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ads = ads::paginate(5);
        return view('home', compact('ads'));
    }
    public function serach(Request $request)
    {
        $query = $request->input('search');
        if(empty($query)){
            return redirect()->back()->with('search', '');
        } 
        $articles = Ads::where('title', 'LIKE', "%{$query}%")
        ->orWhere('category', 'LIKE', "%{$query}%")
        ->orWhere('price', 'LIKE', "%{$query}%")
        ->orWhere('location', 'LIKE', "%{$query}%")
        ->orWhere('description', 'LIKE', "%{$query}%")
        ->get(); 
        $tableau = [];
        foreach($articles as $article){ 
            $st =[
                'title' => $article->title ,
                'price' =>$article->price ,
                'category' =>$article->category ,
                'condition' =>$article->condition ,
                'location' =>$article->location,
                'description' =>$article->description ,
                'image_url' =>$article->image_url,
                'user_id' =>$article->user_id ,
            ];
            array_push($tableau, $st);
        }
        return redirect()->back()->with('search', $tableau);
    }


    public function my_serach(Request $request)
    {
        $query = $request->input('search');
        
        if(empty($query)){
            return redirect()->back()->with('search', '');
        } 
        $articles = Ads::where('title', 'LIKE', "%{$query}%")
        ->orWhere('category', 'LIKE', "%{$query}%")
        ->orWhere('price', 'LIKE', "%{$query}%")
        ->orWhere('location', 'LIKE', "%{$query}%")
        ->orWhere('description', 'LIKE', "%{$query}%")
        ->orWhere('id', 1)
        ->get(); 
        $tableau = [];
        foreach($articles as $article){ 
            $st =[
                'title' => $article->title ,
                'price' =>$article->price ,
                'category' =>$article->category ,
                'conditon' =>$article->conditon ,
                'location' =>$article->location,
                'description' =>$article->description ,
                'image_url' =>$article->image_url,
                'user_id' =>$article->user_id ,
            ];
            array_push($tableau, $st);
        }
        return redirect()->back()->with('search', $tableau);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {        
    if(Auth::check()){
        //validation du formulaire
        $validation = Validator::make($request ->all(), [
            'title' => 'required|string|max:50',
            'price' => 'required|numeric|min:1',
            'category' => 'required|string|max:50',
            'location' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'image' => 'required'
        ]);
        if($validation->fails()){
            return redirect()->back()->with('messsage', 'Erreur lors de l\'envoie veillez réessayer');
        }
        $filename = time(). '.'. $request->file('image')->extension();
        $request->file('image')->storeAS('image',$filename, 'public');

        $article = new ads();
        $article->title = $request->title;
        $article->price = $request->price;
        $article->condition = $request->condition;
        $article->category = $request->category;
        $article->location = $request->location;
        $article->description =$request->description;
        $article->image_url = $filename;
        $article->user_id = Auth::user()->id;
        $article->save(); 

            return redirect()->route('new_ads')->with('mise a jour');
        }else{
            return redirect()->route('login');
        }
    
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        // $ord = ads::orderBy('created_at', 'desc')->get();
        $category = Ads::select('category')->distinct()->get();
        $location = Ads::select('location')->distinct()->get();
        //session()->push('languages', 1);
        $ads =  ads::orderBy('created_at', 'desc')->paginate(5);
        return view('home', compact('category', 'location', 'ads'));
    }

     public function my_show($id="")
    {
        if(Auth::check()){
            $category = Ads::select('category')->distinct()->where('user_id', 3)->get();
            $location = Ads::select('location')->distinct()->where('user_id', 3)->get();
            $ads = ads::orderBy('created_at', 'desc')->paginate(5);
            return view('/my_ads', compact('category', 'location', 'ads'));
        }else{
            return redirect()->route('login');
        }
        
    }

    public function admin_show($id="")
    {
        if(Auth::check() && Auth::user()->admin == 1){
            $ads = Ads::count();
            $users = User::count();
            return view('admin', compact('ads', 'users'));
        }else{
            return redirect()->route('login');
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ads $ads)
    {
        
        return view('my_edite',compact('ads'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ads $ads)
    {
        $new = $request ->validate([
            'title' => 'required',
            'price' => 'required',
            'category' => 'required',
            'location' => 'required',
            'description' => 'required',
            'condition' => 'required',
            
        ]);
            if($request->has('image') && !empty($request->input('image'))){
                $filename = time(). '.'. $request->file('image')->extension();
                $request->file('image')->storeAS('image',$filename,"public");
                $ads->update([
                'image_url' => $filename,
                ]);
            }
        
       $ads->update($new);
       return redirect()->back()->with('mise a jour');
    }

    public function filtrage_home(Request $request){
        $query = Ads::query();

        if ($request->has('category') && !empty($request->input('category')) ) {  
            $searchTerm = $request->input('category');
            $query->where('category',  $searchTerm);
        }

        if ($request->has('price1') && !empty($request->input('price1'))) {
            $searchTerm = $request->input('price1');
            $query->where('price', '>=', $searchTerm);
        }
        if ($request->has('price2') && !empty($request->input('price2'))) {
            $searchTerm = $request->input('price2');
            $query->where('price', '<=', $searchTerm);
        }

        if ($request->has('location') && !empty($request->input('location'))) {
            $searchTerm = $request->input('location');
            $query->where('location', $searchTerm);
        }

        if ($request->has('condition') && !empty($request->input('condition'))) {
            $searchTerm = $request->input('condition');
            $query->where('condition', $searchTerm);
        }
        $ads = $query->paginate(5); 
        $category = Ads::select('category')->distinct()->get();
        $location = Ads::select('location')->distinct()->get();
        return view('/home', compact('category', 'location', 'ads'));    
    }
    
    public function filtrage(Request $request){
        $query = Ads::query();

        if ($request->has('category') && !empty($request->input('category')) ) {  
            $searchTerm = $request->input('category');
            $query->where('category',  $searchTerm);
        }

        if ($request->has('price1') && !empty($request->input('price1'))) {
            $searchTerm = $request->input('price1');
            $query->where('price', '>=', $searchTerm);
        }
        if ($request->has('price2') && !empty($request->input('price2'))) {
            $searchTerm = $request->input('price2');
            $query->where('price', '<=', $searchTerm);
        }

        if ($request->has('location') && !empty($request->input('location'))) {
            $searchTerm = $request->input('location');
            $query->where('location', $searchTerm);
        }

        if ($request->has('condition') && !empty($request->input('condition'))) {
            $searchTerm = $request->input('condition');
            $query->where('condition', $searchTerm);
        }
        $ads = $query->paginate(5); 
        $category = Ads::select('category')->distinct()->get();
        $location = Ads::select('location')->distinct()->get();
        return view('/my_ads', compact('category', 'location', 'ads'));    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ads $ad)
    {
        $ads = Ads::find($ad->id);
        if($ads){
            $ads->delete();
        }
        return redirect()->route('my_ads')->with('mise a jour');
    }
}