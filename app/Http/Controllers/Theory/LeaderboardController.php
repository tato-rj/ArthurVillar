<?php

namespace App\Http\Controllers\Theory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Carbon\CarbonInterval;

class LeaderboardController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'string|required',
            'avatar_url' => 'required',
            'score' => 'required',
            'accuracy' => 'required',
            'rounds' => 'required',
            'duration' => 'required'
        ]);

        $player = Player::create([
            'game' => $request->game,
            'username' => $request->username,
            'avatar_url' => $request->avatar_url,
            'score' => (int) $request->score,
            'accuracy' => (float) $request->accuracy,
            'rounds' => (int) $request->rounds,
            'duration' => (int) CarbonInterval::createFromFormat('i:s', $request->duration)->totalSeconds
        ]);

        $player->calculateFinalScore();

        return back()->with([
            'newPlayer' => $player,
        ]);
    }

    public function edit()
    {
        return Player::latest()->first();
    }
}
