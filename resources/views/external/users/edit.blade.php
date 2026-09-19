@extends('layouts.app', ['title' => 'Edit '.$user->name])

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-6 col-xl-5 mx-auto">
            <a class="small" href="{{ route('users.accounts.show', $user) }}">&larr; Back to account</a>
            <h1 class="mt-2 mb-4">Edit account</h1>

            <form method="POST" action="{{ route('users.accounts.update', $user) }}">
                @csrf
                @method('PATCH')

                <div class="form-group mb-3">
                    <label class="form-label" for="name">Name</label>
                    <input class="form-control @error('name') is-invalid @enderror" id="name" name="name" type="text" value="{{ old('name', $user->name) }}" required>
                    @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="email">Email</label>
                    <input class="form-control @error('email') is-invalid @enderror" id="email" name="email" type="email" value="{{ old('email', $user->email) }}" required>
                    @error('email')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="password">New password</label>
                    <input class="form-control @error('password') is-invalid @enderror" id="password" name="password" type="password" autocomplete="new-password">
                    <div class="form-text">Leave blank to keep the current password.</div>
                    @error('password')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>

                <div class="form-group mb-4">
                    <label class="form-label" for="password_confirmation">Confirm new password</label>
                    <input class="form-control" id="password_confirmation" name="password_confirmation" type="password" autocomplete="new-password">
                </div>

                <button class="btn btn-primary w-100" type="submit">Save changes</button>
            </form>
        </div>
    </div>
</section>
@endsection
