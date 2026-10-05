<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @if(production() && !request()->cookie('exclude_analytics') && !isset($disableAnalytics))
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N2M3B7QD0K"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-N2M3B7QD0K');
        </script>
        @endif

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>
          @if(local())
          (Local)
          @endif

          @if($subdomain = ucfirst(subdomain()))
            @if(isset($title))
            {{$subdomain . ' | ' . $title}}
            @else
            {{$subdomain}}
            @endif
          @else
          {{config('app.name')}}
          @endif
        </title>

        @if(\View::exists('layouts.favicon.'.subdomain()))
            @include('layouts.favicon.'.subdomain())
        @else
            <link href="{{asset('/favicon/favicon.ico')}}" rel="icon" type="image/x-icon">
        @endif
        
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        @if(subdomain(['calendar', 'theory']))
            <link href="{{ mix('css/offline.css') }}" rel="stylesheet">
        @endif

        @stack('header')
    </head>
    <body class="antialiased">
        @include('layouts.overlay')

        @if(subdomain(['calendar', 'theory']))
            @include('layouts.offline')
        @endif

        @if(subdomain(['calendar', 'listening', 'admin']))
        <div class="app-menu-container position-absolute top-0 right-0 py-4 pr-4 pl-2 z-10">
            @auth
            @includeIf('layouts.menu.'.subdomain())
            @endauth
        </div>
        @endif

        @yield('content')

        @if(subdomain() === 'theory')
            @include('theory.components.duel')
        @endif

        @include('layouts.alerts')

        <script src="{{ mix('js/app.js') }}"></script>

        @if(subdomain(['calendar', 'theory']))
            <script src="{{ mix('js/offline.js') }}"></script>
        @endif

        @stack('scripts')
    </body>
</html>
