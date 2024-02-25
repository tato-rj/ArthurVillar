@extends('layouts.app')

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <h1 class="text-center">Manage methods</h1>

        @auth
        <div class="text-center">
            <button data-bs-toggle="modal" data-bs-target="#create-method-modal" class="btn-raw">@fa(['icon' => 'plus'])Add method</button>
        </div>
        @endauth

        <div class="col-lg-8 col-md-10 col-12 mx-auto mt-3">
            <div class="row">
                @foreach($methods as $method)
                <div class="col-lg-4 col-md-6 col-12 mb-2 p-2">
                    @include('listening.methods.button')
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

@include('listening.methods.create')
@endsection

@push('scripts')
@endpush