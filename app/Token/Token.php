<?php

namespace App\Token;

class Token
{
	public static function generate($recording_id, $playlist_id = null)
	{
        $play_token = env('APP_TOKEN');

        return base64_encode(json_encode(compact(['recording_id', 'playlist_id', 'play_token'])));
	}

	public static function read($token)
	{
		return json_decode(base64_decode($token), true);
	}
}