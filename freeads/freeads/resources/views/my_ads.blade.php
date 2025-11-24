<x-base>
    <<x-slot:sign>
        @if (Auth::check())
            <p>Bienvenue, {{ Auth::user()->login }} !</p>
        @else
        <x-connect href="{{ route('login') }}" class="text-sm font-medium text-gray-700 hover:text-blue-400"> Sign in</x-connect>
        <span aria-hidden="true" class="h-6 w-px bg-gray-200 mx-3"></span>
        <x-connect href="{{ route('register') }}" class="text-sm font-medium text-gray-700 hover:text-blue-400"> Sign up</x-connect>
        @endif
    </x-slot:sign>
    <x-slot:link>
        <x-link href="/" :active="Route::currentRouteName() == 'home' ? true : false ">Home</x-link>
        @if (Auth::check())
            <x-link href="/my_ads" :active="Route::currentRouteName() == 'my_ads' ? true : false ">My Ads</x-link>
        @endif
        
        @if (Auth::check() && Auth::user()->admin == 1)
            <x-link href="/admin" :active="Route::currentRouteName() == 'admin' ? true : false ">Dashbord</x-link>
        @endif
    </x-slot:link>
    <x-slot:link_m>
        <x-link_m href="/" :active="Route::currentRouteName() == 'home' ? true : false ">Home</x-link>
        @if (Auth::check())
            <x-link_m href="/my_ads" :active="Route::currentRouteName() == 'my_ads' ? true : false ">My Ads</x-link>
        @endif
        @if (Auth::check() && Auth::user()->admin == 1)
            <x-link_m href="/admin" :active="Route::currentRouteName() == 'admin' ? true : false ">Dashbord</x-link>
        @endif
    </x-slot:link_m>
    <x-slot:main>
    <div class="mb-3">
        
        <!-- Header Section -->
        <div class="my-8 grid grid-cols-3">
            <h1 class="text-3xl font-bold text-gray-900 mb-2 col-span-2">My ads</h1>
            <a href="/new_ads" class="col-span-1 "><button type="button" class="float-right text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">post an ad +</button></a>
            <p class="text-gray-600">see all my ads</p>   
        </div>
        @if (session('search') and !empty(session('search')))
            
            <p class="text-center font-bold">ads found</p>
            <div class="my-8 ">
                <div class=" px-2">  
                <div href="" class="grid  md:grid-cols-2 gap-4 rounded-lg shadow-lg">
                    @foreach (session('search') as $ad)
                    <div>                
                        <a href="" class="w-lg  rounded overflow-hidden shadow-lg grid grid-cols-3 h-100 sm:h-60 border rounded-lg mb-3"> 
                            <img class="h-60 image" class="ml-5" src="{{'storage/image/'.$ad['image_url']}}" alt="">
                            <div class="col-span-2 p-5 grid grid-cols-3">
                                <p class="col-span-2 text-red-500 dark:text-gray-400 text-lg"><strong>{{$ad['title']}}</strong></p>
                                <p class="col-span-1 text-red-500 dark:text-gray-400 text-lg"><strong>{{$ad['category']}}</strong></p>
                                <p class="col-span-2 text-gray-800 dark:text-gray-400"><strong class="underline">Desciption</strong>: {{$ad['description']}} </p>
                                <p class="col-span-1 text-gray-800 dark:text-gray-400"><strong class="underline">Conditon</strong>: {{$ad['conditon']}} </p>
                                <p class="col-span-3 text-gray-800 dark:text-gray-400"><strong  class="underline">Location</strong>: {{$ad['location']}} </p>
                                <p class="col-span-2 text-gray-800 dark:text-gray-400">par <strong class="text-blue-500">Enoh Koffi</strong></p>
                                <p class="col-span-1 text-gray-800 dark:text-gray-400"><strong  class="underline">Price</strong> : <strong class="text-green-700">{{$ad['price']}}$</strong></p>
                            </div>
                        </a>
                         <div class="flex justify-end col-span-3 gap-3 mb-3">
                            <p class="text-blue-900"><i class="fa-solid fa-pen me-1"> </i><a href="/edit">edite</a></p>
                            <p class="text-red-900"><i class="fa-solid fa-trash me-1"></i><a href="/delete">delete</a></p>
                        </div>
                    </div> 
                    @endforeach
                </div>
                </div>  
            </div>
        @endif
        <div class="grid md:grid-cols-3 mt-5 gap-4 filtre">
           <p class="grand col-span-1"></p> 
          <p class="grand col-span-2 mx-2 text-xl font-bold ">Popular</p>
        </div>
        <div class="grid md:grid-cols-3 mt-5 gap-4 filtre">
            <div class="border rounded-lg p-5 shadow-lg">
                <form action="{{url('/my_ads')}}" method="POST" class="max-w-sm mx-auto outline-none">
                    @csrf
                    <p class="mb-5 text-gray-800">filter By</p>
                    <label for="countries" class="block mb-2 font-medium text-gray-900 dark:text-white text-lg text-gary-50">Category</label>
                    <select name="category" id="countries" class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">All</option>
                        @isset($category)
                        @foreach ($category as $ad)
                            <option value='{{$ad->category}}'>{{$ad->category}}</option>
                        @endforeach
                        @endisset
                     </select>   
                     
                     <label for="countries" class="block mb-2 font-medium text-gray-900 dark:text-white text-lg text-gray-800">Location</label>
                    <select name="location" id="countries" class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">All</option>
                        @isset($location)
                        @foreach ($location as $ad)
                            <option value='{{$ad->location}}'->location>{{$ad->location}}</option>
                        @endforeach
                        @endisset
                    </select>
                    <label for="countries" class="block mb-2 font-medium text-gray-800 dark:text-white text-lg text-gary-50">Price</label> 
                    <div class="positionrange">
                        <input name="price1" class="range" type="range" id="slide1" min="0" max="10000" value="0" oninput="slidE1()">
                        <input name="price2" class="range" type="range" id="slide2" min="0" max="10000" value="10000" oninput="slidE2()">
                    </div>
                    <br>
                    <div class="prix mb-5">
                        <p class="prix1">$<span id="prix1">0</span></p>
                        <p class="prix2 p2">$<span id="prix2">10,000</span>+</p>
                    </div>
                    <label for="countries" class="block mb-2 font-medium text-gray-800 dark:text-white text-lg text-gary-50">Condition</label> 
                    
                    <div class="flex items-center w-100 gap-5 mb-5">
                    <div class="flex ">
                        <input name="condition" value="" checked id="default-radio-3" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-3"  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                    </div>
                    <div class="flex ">
                        <input name="condition" value="New"  id="default-radio-1" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">New</label>
                    </div>
                    <div class="flex">
                        <input name="condition" value="Good"  id="default-radio-2" type="radio" value=""class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Good</label>
                    </div>
                    <div class="flex ">
                        <input name="condition" value="Used"  id="default-radio-3" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-3"  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Used</label>
                    </div>
    
                    </div>
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Filter</button>
                </form>
            </div>
        <p class="petit mx-2 text-xl font-bold">Popular</p>
            <div class="md:col-span-2 grid grid-cols-1 rounded-lg shadow-lg px-2">  
                    @isset($ads)
                    @foreach ($ads as $ad)
                        <a href="" class="w-lg rounded overflow-hidden shadow-lg grid grid-cols-3 h-100 sm:h-60 border rounded-lg mb-1"> 
                            <img class="h-60 image" class="ml-5" src="{{'storage/image/'.$ad->image_url}}" alt="">
                            <div class="col-span-2 p-5 grid grid-cols-3">
                                <p class="col-span-2 text-red-500 dark:text-gray-400 text-lg"><strong>{{$ad->title}}</strong></p>
                                <p class="col-span-1 text-red-500 dark:text-gray-400 text-lg"><strong>{{$ad->category}}</strong></p>
                                <p class="col-span-3 text-gray-800 dark:text-gray-400"><strong class="underline">Desciption</strong>: {{$ad->description}} </p>
                                <p class="col-span-2 text-gray-800 dark:text-gray-400"><strong  class="underline">Location</strong>: {{$ad->location}} </p>
                                <p class="col-span-1 text-gray-800 dark:text-gray-400"><strong  class="underline">conditon</strong>: {{$ad->condition}} </p>
                                <p class="col-span-2 text-gray-800 dark:text-gray-400">par <strong class="text-blue-500">Enoh Koffi</strong></p>
                                <p class="col-span-1 text-gray-800 dark:text-gray-400"><strong  class="underline">Price</strong> : <strong class="text-green-700">{{$ad->price}}$</strong></p>
                            </div>
                        </a>
                        <div class="flex justify-end col-span-3 gap-3 mb-3">
                            <p class="text-blue-900"><i class="fa-solid fa-pen me-1"> </i><a href="{{route('edite', $ad)}}">edite</a></p>
                            <p class="text-red-900"><i class="fa-solid fa-trash me-1"></i><a href="{{route('del', $ad)}}">delete</a></p>
                        </div>
                    @endforeach
                    @endisset

            </div>
        </div>
    </div>
    
    {{$ads->links()}}
    </x-slot:main>
</x-base>
    