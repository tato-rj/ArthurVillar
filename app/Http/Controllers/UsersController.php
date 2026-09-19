<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->where('email', '!=', User::ARTHUR_EMAIL)
            ->withCount('schedulers')
            ->latest()
            ->paginate(20);

        return view('external.users.index', compact('users'));
    }

    public function show(User $user)
    {
        $this->ensureManageable($user);

        $user->load([
            'schedulers' => function ($query) {
                $query
                    ->withCount(['options', 'participants'])
                    ->latest();
            },
        ]);

        return view('external.users.show', compact('user'));
    }

    public function edit(User $user)
    {
        $this->ensureManageable($user);

        return view('external.users.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $this->ensureManageable($user);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user),
            ],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        if ($data['password'] ?? null) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()
            ->route('users.accounts.show', $user)
            ->with('success', 'The account was successfully updated');
    }

    public function destroy(User $user)
    {
        $this->ensureManageable($user);

        $user->delete();

        return redirect()
            ->route('users.home')
            ->with('success', 'The account was successfully deleted');
    }

    private function ensureManageable(User $user): void
    {
        abort_if($user->isArthur(), 403);
    }
}
