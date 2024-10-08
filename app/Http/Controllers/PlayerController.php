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

        if ($request->has('token')) {
            $data = Token::read($request->token);

            if (! $data)
                abort(404);

            $playlist_id = $data['playlist_id'] ?? null;
        }

        return redirect(route('recordings.show', [
            'token' => Token::generate($recording->id, $playlist_id),
            'qrcode' => true
        ]));
    }

    public function show($token)
    {
        $request = Token::read($token);

        $recording = Recording::find($request['recording_id']);
        $playlist = Playlist::find($request['playlist_id'] ?? null);

        return view('recordings.play.index', compact(['recording', 'playlist']));
    }

    // public function qrcode(Recording $recording)
    // {
    //     $filename = str_slug($recording->nameWithComposer).'.png';

    //     return response()->streamDownload(function () {
    //         $qrcode = QrCode::size(500)->format('png')->margin(1)->errorCorrection('M');

    //         echo $qrcode->generate(url()->full());
    //     }, $filename, ['Content-Type' => 'image/png']);
    // }
}
