@extends('layouts.app', ['noMenu' => true])

@push('header')
@endpush

@section('content')
<div class="h-100vh d-center">
    <div>
        <h1 class="m-0">👋</h1>
        <h1>Hi, I'm Arthur Villar.<br>I'm a pianist based<br>in Jersey City, NJ.</h1>
        <p class="opacity-5">Here's where you'll find me:</p>

        <div class="mb-4">
            <div>
                <a href="https://bkcm.org/suzuki-faculty/" target="_blank" class="btn-fancy mb-3">Brooklyn Conservatory of Music</a>
            </div>
            <div>
                <a href="https://pianolessonsinjerseycity.com/" target="_blank" class="btn-fancy mb-3">Private piano studio</a>
            </div>
            <div>
                <a href="https://pianolit.com/" target="_blank" class="btn-fancy mb-3">PianoLIT</a>
            </div>
        </div>

        <div class="d-center">
            <div class="mx-2">
                <a href="https://youtube.com/pianolit" target="_blank">
                    @fa(['icon' => 'youtube', 'fa_type' => 'b', 'fa_size' => 'lg', 'mr' => 0])
                </a>
            </div>

            <div class="mx-2">
                <a href="https://www.instagram.com/piano_with_arthur/" target="_blank">
                    @fa(['icon' => 'instagram', 'fa_type' => 'b', 'fa_size' => 'lg', 'mr' => 0])
                </a>
            </div>

            <div class="mx-2">
                <a href="https://www.facebook.com/arthur.villar.31" target="_blank">
                    @fa(['icon' => 'facebook', 'fa_type' => 'b', 'fa_size' => 'lg', 'mr' => 0])
                </a>
            </div>

            <div class="mx-2">
                <a href="mailto:arthurvillar@gmail.com" target="_blank">
                    @fa(['icon' => 'envelope', 'fa_size' => 'lg', 'mr' => 0])
                </a>
            </div>
        </div>
    </div>
</div>

@endsection

@push('scripts')
@endpush