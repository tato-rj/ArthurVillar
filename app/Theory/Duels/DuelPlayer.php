<?php

namespace App\Theory\Duels;

use Illuminate\Database\Eloquent\Model;

class DuelPlayer extends Model
{
    protected $table = 'theory_duel_players';

    protected $guarded = [];

    protected $hidden = ['token_hash', 'connection_id'];

    protected $casts = ['ready_at' => 'datetime', 'rematch_at' => 'datetime', 'finished_at' => 'datetime', 'last_seen_at' => 'datetime', 'departed_at' => 'datetime', 'result' => 'array', 'checkpoint' => 'array'];
}
