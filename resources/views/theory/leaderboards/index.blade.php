@extends('layouts.app', ['title' => 'Leaderboards'])

@push('header')
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">
@endpush

@section('content')
<section class="container py-5 text-center">
        @pagetitle(['label' => 'Leaderboards'])

        <div class="row">
                @foreach($games as $game)
                <div class="col-lg-4 col-md-6 col-12 g-3">
                        <div class="border rounded p-2 bg-light leaderboard-wrapper">
                                <div class="text-center border rounded bg-white py-2 mb-2">
                                        <h6 class="m-0">@fa(['icon' => $game->gameIcon(), 'fa_color' => $game->gameTheme()]){{$game->gameName()}}</h6>
                                </div>

                                <div class="text-center mb-3">
                                        @include('theory.components.leaderboard.nav', ['name' => $game->gameName()])
                                </div>

                                <div style="max-height: 400px; overflow-y: scroll;" class="leaderboard-players">
                                        @include('theory.components.leaderboard.list', [
                                                'leaderboard' => $game->leaderboard(), 
                                                'settings' => $game
                                                ])
{{--                                         @forelse($game->leaderboard() as $player)
                                                @include('admin.leaderboards.entry')
                                        @empty
                                                <div class="p-5 d-center">No players yet...</div>
                                        @endforelse --}}
                                </div>
                        </div>
                </div>
                @endforeach
        </div>

</section>
@endsection

@push('scripts')
@endpush
