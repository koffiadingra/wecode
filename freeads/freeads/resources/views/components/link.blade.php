@props(['active'=>false])

<a {{$attributes}} class="{{$active == true ? 'grandE border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium':'grandE border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}}">
    {{$slot}}
</a>
