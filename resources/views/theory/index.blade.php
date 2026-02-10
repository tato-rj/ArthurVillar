@extends('layouts.app', ['title' => 'Theory', 'noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-6 col-md-8 col-12 mx-auto">
            <h1>Interval Challenges</h1>
            <p>A fast, engaging music game that sharpens your note reading and musical thinking. Short challenges, instant feedback, and a score that pushes you to improve each time. Perfect for quick practice that actually builds real skills.</p>
            <a href="{{route('theory.intervals.index')}}" class="btn btn-primary w-100">@fa(['icon' => 'arrow-right'])Start Challenge</a>
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush