@props(['active'=>false])

<a {{$attributes}} class="{{$active == true ? 'petitE bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium':'petitE border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}}">
    {{$slot}}
</a>