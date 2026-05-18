@extends('layouts.app', ['title' => 'Leaderboards'])

@push('header')
@endpush

@section('content')
<section class="container py-5 text-center">
        @pagetitle(['label' => 'Leaderboards'])

        @include('theory.components.leaderboard.nav')

        <div class="row">
                @foreach($games as $game)
                <div class="col-lg-4 col-md-6 col-12 g-3">
                        <div class="border rounded p-2 bg-light">
                                <div class="text-center border position-relative rounded bg-white py-2">
                                        <h6 class="m-0">@fa(['icon' => $game->gameIcon(), 'fa_color' => $game->gameTheme()]){{$game->gameName()}}</h6>
                                        <div class="position-absolute top-0 right-0">
                                                <form method="POST" action="{{route('admin.leaderboard.fake')}}">
                                                        @csrf
                                                        <input type="hidden" name="game" value="{{$game->gameName()}}">
                                                        <button type="submit" class="btn-raw h-100 p-2">@fa(['icon' => 'wand-magic-sparkles', 'mr' => 0])</button>
                                                </form>
                                        </div>
                                </div>

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
<script>
$('[name="leaderboard-range"]').change(function() {
        window.location.assign($(this).data('url'));
});
</script>
@endpush
