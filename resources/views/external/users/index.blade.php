@extends('layouts.app', ['title' => 'Users'])

@section('content')
<section class="container py-5">
    <div class="d-flex align-items-end justify-content-between gap-3 mb-4">
        <div>
            <h1 class="mb-1">Users</h1>
            <p class="text-muted mb-0">Accounts registered through Scheduler.</p>
        </div>
        <span class="badge bg-dark">{{ $users->total() }} {{ Str::plural('account', $users->total()) }}</span>
    </div>

    <div class="table-responsive border rounded">
        <table class="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th class="ps-3">Name</th>
                    <th>Email</th>
                    <th>Invitations</th>
                    <th>Registered</th>
                    <th class="text-end pe-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($users as $user)
                    <tr>
                        <td class="ps-3 fw-bold">{{ $user->name }}</td>
                        <td><a href="mailto:{{ $user->email }}">{{ $user->email }}</a></td>
                        <td>{{ $user->schedulers_count }}</td>
                        <td>{{ $user->created_at->format('M j, Y') }}</td>
                        <td class="text-end pe-3 text-nowrap">
                            <a class="btn btn-sm btn-outline-dark" href="{{ route('users.accounts.show', $user) }}">View</a>
                            <a class="btn btn-sm btn-outline-dark" href="{{ route('users.accounts.edit', $user) }}">Edit</a>
                            <form class="d-inline" method="POST" action="{{ route('users.accounts.destroy', $user) }}" onsubmit="return confirm('Delete this account and all of its invitations?')">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-sm btn-outline-danger" type="submit">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="text-center text-muted py-5" colspan="5">No one has registered yet.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($users->hasPages())
        <div class="mt-4">{{ $users->links() }}</div>
    @endif
</section>
@endsection
