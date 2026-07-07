<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @if(production() && !request()->cookie('exclude_analytics'))
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

        <title>
          @if(local())
          (Local)
          @endif
          {{$title ?? config('app.name')}}
        </title>

        <!-- Fonts -->
        @if(subdomain('studio'))
        <link href="{{asset('/favicon/favicon_studio.ico')}}" rel="icon" type="image/x-icon">
        @else
        <link href="{{asset('/favicon/favicon.ico')}}" rel="icon" type="image/x-icon">
        @endif
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        @stack('header')
    </head>
    <body class="antialiased">
        @include('layouts.overlay')

        @unless(isset($noMenu))
        <div class="position-absolute top-0 right-0 p-4 z-10">
            @auth
            @includeIf('layouts.menu.'.subdomain())
            @endauth
        </div>
        @endunless

        @yield('content')

        @include('layouts.alerts')

        <script src="{{ mix('js/app.js') }}"></script>
        @stack('scripts')
    </body>
</html>
