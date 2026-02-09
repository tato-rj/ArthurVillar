@extends('layouts.app', ['title' => 'Theory', 'noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-6 col-md-8 col-12 mx-auto">
            <a href="{{route('theory.intervals.index')}}" class="btn btn-primary w-100">Intervals Challenge</a>
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush