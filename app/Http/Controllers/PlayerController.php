<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Recording, Playlist};
use App\Token\Token;
use Illuminate\Support\Str;

class PlayerController extends Controller
{
    public function url(Request $request, Recording $recording)
    {
        $request->validate([
            'playlist_id' => 'sometimes|exists:playlists,id'
        ]);

        $playlist_id = $request->playlist_id;

        if ($request->has('token')) {
            $data = Token::read($request->token);

            if (! $data)
                abort(404);

            $playlist_id = $data['playlist_id'] ?? null;
        }

        $referrer = $request->headers->get('referer');
        $params = ['token' => Token::generate($recording->id, $playlist_id)];

        if ($referrer && Str::contains($referrer, 'admin.arthurvillar'))
            $params['qrcode'] = true;

        return redirect(route('recordings.show', $params));
    }

    public function show($token)
    {
        $request = Token::read($token);

        $recording = Recording::find($request['recording_id']);
        $playlist = Playlist::find($request['playlist_id'] ?? null);

        return view('admin.listening.recordings.play.index', compact(['recording', 'playlist']));
    }
}
