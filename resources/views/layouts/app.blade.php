<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{$title ?? config('app.name')}}</title>

        <!-- Fonts -->
        <link href="{{asset('/favicon/favicon.ico')}}" rel="icon" type="image/x-icon">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        @stack('header')
    </head>
    <body class="antialiased">
        
        @yield('content')

        <script src="{{ mix('js/app.js') }}"></script>
        
        @stack('scripts')
    </body>
</html>
