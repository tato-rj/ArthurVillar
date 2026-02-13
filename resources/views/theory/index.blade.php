@extends('layouts.app', ['title' => 'Music Theory Challenges', 'noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container py-4">
    <div class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <h1 class="text-center mb-4">Music Theory Challenges</h1>
            @component('theory.card', ['title' => 'Intervals', 'description' => 'Fast game for note reading and musical thinking. Quick challenges, instant feedback, and scoring to track improvement.'])
                @include('theory.intervals.modals.settings')
            @endcomponent

            @component('theory.card', ['disabled' => true, 'title' => 'Chords', 'description' => 'Train chord recognition and harmony. Identify triads and 7th chords, get instant feedback, and build theory skills with short tasks.'])
                {{-- @include('theory.intervals.modals.settings') --}}
            @endcomponent

            @component('theory.card', ['disabled' => true, 'title' => 'Ear Traning', 'description' => 'Practice melody and chord dictation. Listen, write what you hear, and get instant feedback to sharpen your ear.'])
                {{-- @include('theory.intervals.modals.settings') --}}
            @endcomponent
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush