@extends('layouts.app', ['title' => 'Music Theory Challenges', 'noMenu' => true])

@push('header')
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">
<style>
h5 i {
    transform: rotate(15deg);
}
</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="text-center mb-4 px-4">
            <h1 class="text-center">Music Theory Challenges</h1>
            <p>Interactive games for practicing core music theory skills</p>
        </div>

        @component('theory.card', ['settings' => $intervalsLabSettings, 'icon' => 'flask'])
            @include('theory.intervals.modals.settings', ['settings' => $intervalsLabSettings])
        @endcomponent

        @component('theory.card', ['settings' => $chordsLabSettings, 'icon' => 'flask'])

            @include('theory.chords.modals.settings', ['settings' => $chordsLabSettings])
        @endcomponent

        @component('theory.card', ['settings' => $pitchDetectiveSettings, 'icon' => 'magnifying-glass'])
            @include('theory.dictation.modals.settings', ['settings' => $pitchDetectiveSettings])
        @endcomponent

        @component('theory.card', ['settings' => $toneTrekSettings, 'icon' => 'shoe-prints'])
            @include('theory.blocks.modals.settings', ['settings' => $toneTrekSettings])
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