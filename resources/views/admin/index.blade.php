@extends('layouts.app', ['title' => 'Home'])

@section('content')
<section class="container py-5">
    @pagetitle(['label' => 'Admin'])

    <div class="row g-3">
        @foreach([
            'admin.users.index' => 'Users',
            'admin.theory.mic.index' => 'Microphone',
            'admin.theory.audio.index' => 'Audio Control',
            'admin.theory.leaderboard.index' => 'Leaderboards',
            'admin.theory.tournaments.index' => 'Tournaments',
            'admin.theory.stats.index' => 'Stats',
        ] as $route => $label)
            <div class="col-md-4 col-sm-6">
                <a class="d-block border rounded p-4 text-center" href="{{ route($route) }}">{{ $label }}</a>
            </div>
        @endforeach
    </div>
</section>
@endsection
