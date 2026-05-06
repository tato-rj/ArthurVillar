<?php

namespace App\Http\Controllers\Theory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;

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

        Player::create([
            'game' => $request->game,
            'username' => $request->username,
            'avatar_url' => $request->avatar_url,
            'score' => (int) $request->score,
            'accuracy' => (float) $request->accuracy,
            'rounds' => (int) $request->rounds,
            'duration' => (int) $request->duration,
            'finalScore' => $this->leaderboardScore($request)
        ]);

        return back()->with([
            'showLeaderboard' => true,
        ]);
    }

    private function leaderboardScore($request): int 
    {
        $acc = (float) $request->accuracy / 1000;

        $result =
            (
                pow((int) $request->score, 1.08) *
                $acc *
                pow((int) $request->rounds + 1, 0.35) *
                (30 / ((int) $request->duration + 10))
            ) * 18.7;

        return (int) round($result);
    }
}
