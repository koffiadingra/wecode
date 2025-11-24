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
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header Section -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashbord</h1>
            <p class="text-gray-600">Welcome to admin dashbord</p>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Card 1 -->
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Users of Free Ads</p>
                        <p class="text-2xl font-bold text-gray-900">{{$users}}</p>
                    </div>
                </div>
                <div class="mt-4 text-sm text-blue-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                    </svg>
                    <span>12.5% depuis le mois dernier</span>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Ads of Free ADS</p>
                        <p class="text-2xl font-bold text-gray-900">{{$ads}}</p>
                    </div>
                </div>
                <div class="mt-4 text-sm text-green-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                    </svg>
                    <span>8.2% depuis le mois dernier</span>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Projets</p>
                        <p class="text-2xl font-bold text-gray-900">56</p>
                    </div>
                </div>
                <div class="mt-4 text-sm text-yellow-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                    </svg>
                    <span>3 nouveaux ce mois-ci</span>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Messages</p>
                        <p class="text-2xl font-bold text-gray-900">234</p>
                    </div>
                </div>
                <div class="mt-4 text-sm text-purple-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                    </svg>
                    <span>23 non lus</span>
                </div>
            </div>
        </div>
    </div>
    </x-slot:main>
</x-base>