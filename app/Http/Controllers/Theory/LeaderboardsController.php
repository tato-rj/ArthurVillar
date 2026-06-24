<?php

namespace App\Http\Controllers\Theory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Carbon\CarbonInterval;

class LeaderboardsController extends Controller
{
    public function index()
    {
        return view('theory.leaderboards.index');    
    }

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

    public function show(Request $request)
    {
        $leaderboard = Player::byGame($request->game)->range($request->range)->orderBy('finalScore', 'DESC')->get();

        return view('theory.components.leaderboard.list', compact('leaderboard'))->render();
    }

    public function finalPoints(Request $request)
    {
        return (new Player)->calculateFinalScore($request);
    }

    public function destroy(Player $player)
    {
        $player->delete();

        return back()->with('success', 'The entry was successully deleted');
    }
}
