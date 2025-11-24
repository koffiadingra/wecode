<x-base>
    <x-slot:sign>
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
        
        <form action="{{route('update', $ads->id)}}" method="post" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border mt-5" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            {{-- @dd($ads->title) --}}
            @if (session('messsage'))
                <p class="text-red-500 text-center mb-5">{{session('messsage')}}</p>
            @endif
            @csrf
            <fieldset>
            <legend class="text-center font-bold my-5 underline underline-offset-4">Edite my Ad</legend>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Ad title
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value="{{$ads->title}}" name="title">                
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        price
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" value="{{$ads->price}}" name="price">
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Location
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value="{{$ads->location}}" name="location">                
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name"  >
                        category
                    </label>
                    <input name="category" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" value="{{$ads->category}}">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name"  >
                        category
                    </label>
                    <select name="condition" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Used">Used</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label for="message" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                    <textarea id="message" rows="3" name="description"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >{{$ads->description}}</textarea>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        upload an image
                    </label>  
                    <label for="file-input" class="sr-only" >Choose file</label>
                    
                    <input type="file" name="image" id="file-input" class="appearance-none block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0  file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400 bg-gray-200">
                    <button type="submit" name="publier" class="block w-full bg-blue-700 text-white font-bold border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-5">
                        Update
                    </button>
                </div>
                
            </div>
            
            </fieldset>
        </form>
    </x-slot:main>
</x-base>