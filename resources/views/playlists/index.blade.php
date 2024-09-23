@extends('layouts.app', ['title' => 'Playlists'])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Playlists',
            'modal' => [
                'target' => '#create-playlist-modal',
                'icon' => 'plus',
                'label' => 'New playlist'
            ]
        ])
    </div>

@endsection

@push('scripts')
@endpush