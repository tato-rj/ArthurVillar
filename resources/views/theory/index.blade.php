@extends('layouts.app', ['title' => 'Music Challenges'])

@push('header')
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">

<style>
#user-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 0;
    background: 0;
    font-size: 2.4rem;
    color: lightgrey;
}

#user-avatar-menu [hidden] {
    display: none !important;
}

.game-header {
    text-align: center;
}

@media (max-width: 767.98px) {
    .game-header {
        text-align: left;
    }

    .game-header h1, .game-header p {
        max-width: 80%;
    }

    .game-card {
        margin-right: auto !important;
        margin-left: auto !important;
    }
}
</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-12">
            <div class="game-header mb-4 px-4 position-relative">
                <h1>Music Theory Challenges</h1>
                <p>Interactive games for practicing core music theory skills</p>
                <a href="{{route('theory.open-staff.play')}}" class="btn btn-outline-secondary">@fa(['icon' => 'chalkboard'])Open Staff</a>

                @include('theory.profile.avatar')
            </div>

            <div class="text-right">
                @if($category = request('category'))
                <div class="d-inline-block">
                    <a href="{{route('theory.home')}}" class="btn btn-raw">
                    <div class="border rounded border-3 px-2 py-1 small d-center fw-bold text-muted">
                        @fa(['icon' => 'times']){{$category}}
                    </div>
                    </a>
                </div>
                @endif
            </div>
        </div>
    </div>
    <div class="row">
        @foreach($games as $settings)
            @php
                $matchesCategory = ! request('category')
                    || $settings->categories()->contains(request('category'));
            @endphp
            
            @if($settings->public() && $matchesCategory)
                @include('theory.card')
            @endif
        @endforeach
    </div>
</section>
@endsection

@push('scripts')
<script>
$('.mode-menu button').on('click', function () {
  const $btns = $(this).siblings().addBack();
  $btns.removeClass('btn-secondary').addClass('btn-outline-secondary')
       .each((_, b) => $($(b).data('target')).hide());
  $(this).removeClass('btn-outline-secondary').addClass('btn-secondary');
  $($(this).data('target')).show();
});
</script>

<script>
</script>
@endpush
