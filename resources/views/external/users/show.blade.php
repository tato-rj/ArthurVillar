@extends('layouts.app', ['title' => $user->name])

@section('content')
<section class="container py-5">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
            <a class="small" href="{{ route('users.home') }}">&larr; All users</a>
            <h1 class="mt-2 mb-1">{{ $user->name }}</h1>
            <a href="mailto:{{ $user->email }}">{{ $user->email }}</a>
        </div>
        <div>
            <a class="btn btn-outline-dark" href="{{ route('users.accounts.edit', $user) }}">Edit account</a>
            <form class="d-inline" method="POST" action="{{ route('users.accounts.destroy', $user) }}" onsubmit="return confirm('Delete this account and all of its invitations?')">
                @csrf
                @method('DELETE')
                <button class="btn btn-danger" type="submit">Delete account</button>
            </form>
        </div>
    </div>

    <div class="row g-3 mb-5">
        <div class="col-sm-6 col-lg-3">
            <div class="border rounded p-3 h-100">
                <div class="text-muted small">Registered</div>
                <div class="fw-bold">{{ $user->created_at->format('M j, Y') }}</div>
            </div>
        </div>
        <div class="col-sm-6 col-lg-3">
            <div class="border rounded p-3 h-100">
                <div class="text-muted small">Invitations</div>
                <div class="fw-bold">{{ $user->schedulers->count() }}</div>
            </div>
        </div>
    </div>

    <h2 class="h4 mb-3">Invitations</h2>
    <div class="table-responsive border rounded">
        <table class="table align-middle mb-0">
            <thead>
                <tr>
                    <th class="ps-3">Title</th>
                    <th>Options</th>
                    <th>Participants</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                @forelse($user->schedulers as $scheduler)
                    <tr>
                        <td class="ps-3 fw-bold">{{ $scheduler->title }}</td>
                        <td>{{ $scheduler->options_count }}</td>
                        <td>{{ $scheduler->participants_count }}</td>
                        <td>{{ $scheduler->created_at->format('M j, Y') }}</td>
                    </tr>
                @empty
                    <tr>
                        <td class="text-center text-muted py-5" colspan="4">This user has not created any invitations.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</section>
@endsection
