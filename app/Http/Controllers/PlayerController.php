<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Recording, Playlist};
use App\Token\Token;

class PlayerController extends Controller
{
    public function url(Request $request, Recording $recording)
    {
        $request->validate([
            'playlist_id' => 'sometimes|exists:playlists,id'
        ]);

        $playlist_id = $request->playlist_id;

        if ($request->has('play_token')) {
            $data = Token::read($request->play_token);

            if (! $data)
                abort(404);

            $playlist_id = $data['playlist_id'] ?? null;
        }

        $token = Token::generate($recording->id, $playlist_id);

        // $data = $recording->readToken($token);

        $url = route('recordings.show', $token);

        return redirect($url);
    }

    // public function url(Request $request, Recording $recording)
    // {
    //     $url = route('recordings.show', [
    //         'recording' => $recording, 
    //         'playlist_id' => $request->playlist_id,
    //         'play_token' => env('APP_TOKEN')
    //     ]);

    //     return redirect($url);
    // }

    public function show($token)
    {
        $request = Token::read($token);

        $recording = Recording::find($request['recording_id']);
        $playlist = Playlist::find($request['playlist_id'] ?? null);

        return view('recordings.play.index', compact(['recording', 'playlist']));
    }

    // public function show(Request $request, Recording $recording)
    // {
    //     $playlist = Playlist::find($request->playlist_id);

    //     return view('recordings.play.index', compact(['recording', 'playlist']));
    // }
}
