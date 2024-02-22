<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{$title ?? config('app.name')}}</title>

        <!-- Fonts -->
        <link href="{{asset('/favicon/favicon.ico')}}" rel="icon" type="image/x-icon">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        <style type="text/css">
            #overlay {
                z-index: 10000;
                background: rgba(255,255,255,0.85);
            }
        </style>

        @stack('header')
    </head>
    <body class="antialiased">
        @include('layouts.overlay')

        @if(! isset($noMenu))
        <div class="position-fixed top-0 right-0 p-4 z-10">
            @auth
            @include('layouts.menu')
            @else
            <a href="{{route('login')}}">Login</a>
            @endauth
        </div>
        @endif

        @yield('content')

        @include('layouts.alerts')

        <script src="{{ mix('js/app.js') }}"></script>
        
        @stack('scripts')
    </body>
</html>
