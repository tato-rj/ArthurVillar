<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Token\Token;
use App\Models\Playlist;

class MustHaveValidPlayToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $data = Token::read($request->token);
        $playlist = Playlist::find($data['playlist_id'] ?? null);

        $secret = $playlist ? $playlist->secret : env('APP_TOKEN');

        if ($data && $data['secret'] == $secret)
            return $next($request);

        abort(404);
    }
}
