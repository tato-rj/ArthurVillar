@extends('layouts.app', ['title' => 'Admin Game Audio'])

@push('header')

@endpush

@section('content')
<section class="container py-5 text-center">
        @pagetitle(['label' => 'Sound Effects'])

        <div class="row" id="sound-effects-list">
                @include('admin.sound-effects.sound')
        </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/admin-soundeffects.js') }}"></script>
@endpush
