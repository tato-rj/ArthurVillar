@extends('layouts.app', ['title' => 'Theory', 'noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <h1 class="text-center mb-4">Music Theory Challenges</h1>
            <div class="mb-5">
                <h3>Intervals</h3>
                <p>A fast, engaging music game that sharpens your note reading and musical thinking. Short challenges, instant feedback, and a score that pushes you to improve each time. Perfect for quick practice that actually builds real skills.</p>

                <button data-bs-toggle="modal" data-bs-target="#intervals-settings-modal" class="btn btn-white w-100">@fa(['icon' => 'gear'])Set up challenge</button>

                @include('theory.intervals.modals.settings')
            </div>

            <div class="mb-5">
                <h3>Chords</h3>
                <p>An interactive music game that builds your chord recognition and harmonic awareness. Identify triads, 7th chords, and extended chords, get immediate feedback, and track your progress as your ear and theory knowledge grow through short, practical challenges.</p>

                <button disabled data-bs-toggle="modal" data-bs-target="#chords-settings-modal" class="btn btn-white w-100">Coming up soon</button>
            </div>

            <div class="mb-5">
                <h3>Counterpoint</h3>
                <p>Explore how independent melodies fit together by working with real counterpoint patterns. Combine lines, handle consonance and dissonance correctly, and see how small note choices affect the whole texture. The exercises guide you toward clearer, more musical voice leading.</p>

                <button disabled data-bs-toggle="modal" data-bs-target="#counterpoint-settings-modal" class="btn btn-white w-100">Coming up soon</button>
            </div>
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush