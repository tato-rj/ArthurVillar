@extends('layouts.app', ['title' => 'Theory', 'noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-6 col-md-8 col-12 mx-auto">
            <h1>Intervals Challenge</h1>
            <p>A fast, engaging music game that sharpens your note reading and musical thinking. Short challenges, instant feedback, and a score that pushes you to improve each time. Perfect for quick practice that actually builds real skills.</p>


            <button data-bs-toggle="modal" data-bs-target="#settings-modal" class="btn btn-white w-100">Go to Challenge</button>

            @include('theory.intervals.modals.settings', ['btnLabel' => 'Start game'])
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush