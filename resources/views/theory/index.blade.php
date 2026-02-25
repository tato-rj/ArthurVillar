@extends('layouts.app', ['title' => 'Music Theory Challenges', 'noMenu' => true])

@push('header')

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
                'settings' => $intervalsSettings,
                'title' => 'Intervals', 
                'description' => 'Practice the most common chromatic intervals in different clefs.'])

                @include('theory.intervals.modals.settings', [
                    'settings' => $intervalsSettings, 
                    'modalID' => 'intervals-settings-modal'])
            @endcomponent

            @component('theory.card', [
                'settings' => $chordsSettings,
                'title' => 'Chords', 
                'description' => 'Practice the four fundamental triads as well as 7th chords.'])

                @include('theory.chords.modals.settings', [
                    'settings' => $chordsSettings, 
                    'modalID' => 'chords-settings-modal'])
            @endcomponent

            @component('theory.card', [
                'settings' => $dictationSettings,
                'title' => 'Dictation', 
                'description' => 'Practice harmonic, melodic, or rhythmic dictation.'])

                @include('theory.dictation.modals.settings', [
                    'settings' => $dictationSettings, 
                    'modalID' => 'dictation-settings-modal'])
            @endcomponent
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush