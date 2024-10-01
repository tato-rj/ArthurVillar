<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Recording, Playlist};

class PlayerController extends Controller
{
    public function url(Request $request, Recording $recording)
    {
        $url = route('recordings.show', [
            'recording' => $recording, 
            'playlist_id' => $request->playlist_id,
            'play_token' => env('APP_TOKEN')
        ]);

        return redirect($url);
    }

    public function show(Request $request, Recording $recording)
    {
        $playlist = Playlist::find($request->playlist_id);

        return view('recordings.play.index', compact(['recording', 'playlist']));
    }
}
