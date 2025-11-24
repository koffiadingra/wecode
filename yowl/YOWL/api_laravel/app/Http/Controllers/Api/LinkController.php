<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Embed\Embed;

class LinkController extends Controller
{
    public function index(Request $request)
    {  
        $embed = new Embed();
        //Load any url:
        $info = $embed->get($request->url);
        return [
            'title'=>$info->title,
            'url'=>$info->url,
            'image'=>$info->image,
            'description'=>$info->description,
        ];
    }
}