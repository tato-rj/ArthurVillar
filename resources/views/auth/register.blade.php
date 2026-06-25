@extends('layouts.app', ['noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container">
    <div class="h-100vh row align-items-center">
        <div class="col-lg-3 col-md-4 col-8 mx-auto">
            <h1 class="mb-4">Register</h1>
            <form method="POST" action="{{route('register')}}">
                @csrf
                <div class="form-group">
                    <input required placeholder="Name" type="string" name="name" class="form-control">
                </div>
                <div class="form-group">
                    <input required placeholder="Email" type="email" name="email" class="form-control">
                </div>
                <div class="form-group">
                    <input required placeholder="Password" type="password" name="password" class="form-control">
                </div>
                <div class="form-group">
                    <input required placeholder="Password" type="password" name="password_confirmation" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush