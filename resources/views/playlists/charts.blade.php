@extends('layouts.app', ['title' => 'Playlist Charts'])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Playlist Charts',
            'subtitle' => $playlist->name
        ])
    </div>

    <div id="charts-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">

        </div>
    </div>

@endsection

@push('scripts')
@endpush