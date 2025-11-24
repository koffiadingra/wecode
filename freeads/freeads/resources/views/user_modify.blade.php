<x-base>
    <x-slot:sign>
        <x-connect>
        </x-connect>
    </x-slot:sign>
    <x-slot:link>
        <x-link href="/" :active="Route::currentRouteName() == 'home' ? true : false ">Home</x-link>
        <x-link href="/my_ads" :active="Route::currentRouteName() == 'my_ads' ? true : false ">My Ads</x-link>
        <x-link href="/admin" :active="Route::currentRouteName() == 'admin' ? true : false ">Dashbord</x-link>
    </x-slot:link>
     <x-slot:link_m>
        <x-link_m href="/" :active="Route::currentRouteName() == 'home' ? true : false ">Home</x-link>
        <x-link_m href="/my_ads" :active="Route::currentRouteName() == 'my_ads' ? true : false ">My Ads</x-link>
        <x-link_m href="/admin" :active="Route::currentRouteName() == 'admin' ? true : false ">Dashbord</x-link>
    </x-slot:link_m>
    <x-slot:main>
    <!-- Main Content -->
        
    </x-slot:main>
</x-base>