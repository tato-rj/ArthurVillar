@extends('layouts.app', ['title' => 'Audio Control'])

@push('header')

@endpush

@section('content')
<section class="container py-5 text-center">
        @pagetitle(['label' => 'Audio Control'])

        <div class="row" id="sound-effects-list">
                @include('theory.audio.control')
        </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/admin-soundeffects.js') }}"></script>
@endpush
