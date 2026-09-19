@extends('layouts.app', ['noMenu' => true])

@push('header')
@endpush

@section('content')
<section class="container">
    <div class="h-100vh row align-items-center">
        <div class="col-lg-3 col-md-4 col-8 mx-auto">
            <h1 class="mb-4">Register</h1>
            <form method="POST" action="{{ request()->url() }}">
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

            <p class="text-center mt-3 mb-0">
                Already have an account?
                <a href="{{ url('/login') }}">Log in</a>
            </p>
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush
