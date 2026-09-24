<?php

namespace App\Token;

use App\Models\Listening\Playlist;

class Token
{
	public static function generate($recording_id, $playlist_id = null)
	{
        $playlist = $playlist_id instanceof Playlist ? $playlist_id :
            ($playlist_id ? Playlist::findOrFail($playlist_id) : null);
        $playlist_id = $playlist ? $playlist->id : null;
        $secret = $playlist ? $playlist->secret : env('APP_TOKEN');

        return base64_encode(json_encode(compact(['recording_id', 'playlist_id', 'secret'])));
	}

	public static function read($token)
	{
		return json_decode(base64_decode($token), true);
	}
}
