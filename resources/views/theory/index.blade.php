@extends('layouts.app', ['title' => 'Music Theory Challenges', 'noMenu' => true])

@push('header')
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">
<style>
</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="text-center mb-2 px-4">
            <h1 class="text-center">Music Theory Challenges</h1>
            <p>Interactive games for practicing core music theory skills</p>
        </div>

        @component('theory.card', ['settings' => $intervalsLabSettings])
            @include('theory.intervals-lab.modals.settings', ['settings' => $intervalsLabSettings])
        @endcomponent

        @component('theory.card', ['settings' => $chordsLabSettings])

            @include('theory.chords-lab.modals.settings', ['settings' => $chordsLabSettings])
        @endcomponent

        @component('theory.card', ['settings' => $pitchDetectiveSettings])
            @include('theory.pitch-detective.modals.settings', ['settings' => $pitchDetectiveSettings])
        @endcomponent

        @component('theory.card', ['settings' => $toneTrekSettings])
            @include('theory.tone-trek.modals.settings', ['settings' => $toneTrekSettings])
        @endcomponent
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
@endpush