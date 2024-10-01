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

    <div id="playlists-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
            @include('playlists.table.results')
        </div>
    </div>
@include('playlists.create')
@endsection

@push('scripts')
@endpush