<?php

namespace App\Token;

use App\Models\Playlist;

class Token
{
	public static function generate($recording_id, $playlist_id = null)
	{
        $secret = $playlist_id ? 
        	Playlist::find($playlist_id)->secret : 
        	env('APP_TOKEN');

        return base64_encode(json_encode(compact(['recording_id', 'playlist_id', 'secret'])));
	}

	public static function read($token)
	{
		return json_decode(base64_decode($token), true);
	}
}