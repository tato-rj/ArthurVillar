@extends('layouts.app', ['title' => 'Leaderboards'])

@push('header')

@endpush

@section('content')
<section class="container py-5 text-center">
        @pagetitle(['label' => 'Leaderboards'])

        <div class="row">
                @foreach($games as $game)
                <div class="col-lg-4 col-md-6 col-12 g-3">
                        <div class="border rounded p-2 bg-light">
                                <h6 class="border bg-white rounded py-2">@fa(['icon' => $game->gameIcon(), 'fa_color' => $game->gameTheme()]){{$game->gameName()}}</h6>
                                @forelse($game->leaderboard() as $player)
                                        @include('admin.leaderboards.entry')
                                @empty
                                        <div class="p-5 d-center">No players yet...</div>
                                @endforelse
                        </div>
                </div>
                @endforeach
        </div>

</section>
@endsection

@push('scripts')
@endpush
