<?php

namespace App\Actions\Fortify;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class CustomLoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $request->session()->regenerate();

        // Always remember the user
        auth()->login(auth()->user(), true);

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect()->intended(config('fortify.home'));
    }
}
