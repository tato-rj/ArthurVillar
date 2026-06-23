<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class LeaderboardsController extends Controller
{
    public function index()
    {
        dd('not here');
        // foreach (Player::all() as $player) {
        //     $player->calculateFinalScore();
        // }
        return view('admin.leaderboards.index');
    }

    public function fake(Request $request)
    {
        dd('not here');
        (new Player)->fake($request->game);

        return back()->with('success', 'The fake player was successully created');
    }

    public function edit()
    {
        dd('not here');
    }

    public function destroy(Player $player)
    {
        dd('not here');
        $player->delete();

        return back()->with('success', 'The entry was successully deleted');
    }
}
