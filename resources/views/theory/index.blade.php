@extends('layouts.app', ['title' => 'Music Theory Challenges', 'noMenu' => true])

@push('header')
<style>

</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-6 col-md-8 col-11 mx-auto">
            <div class="text-center mb-4">
                <h1 class="text-center">Music Theory Challenges</h1>
                <p>Interactive games for practicing core music theory skills</p>
            </div>

            @component('theory.card', [
                'settings' => $intervalsBuilderSettings,
                'title' => 'Intervals Builder', 
                'description' => 'Practice the most common chromatic intervals in different clefs.'])

                @include('theory.intervals.modals.settings', [
                    'settings' => $intervalsBuilderSettings, 
                    'modalID' => 'intervals-builder-settings-modal'])
            @endcomponent

            @component('theory.card', [
                'settings' => $intervalsDictationSettings,
                'title' => 'Intervals Dictation', 
                'description' => 'Practice intervals dictation in different clefs.'])

                @include('theory.dictation.modals.settings', [
                    'settings' => $intervalsDictationSettings, 
                    'modalID' => 'intervals-dictation-settings-modal'])
            @endcomponent

            @component('theory.card', [
                'settings' => $chordsBuilderSettings,
                'title' => 'Chords Builder', 
                'description' => 'Practice the four fundamental triads as well as 7th chords.'])

                @include('theory.chords.modals.settings', [
                    'settings' => $chordsBuilderSettings, 
                    'modalID' => 'chords-builder-settings-modal'])
            @endcomponent
        </div>
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