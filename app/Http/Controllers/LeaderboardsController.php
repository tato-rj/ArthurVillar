<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class LeaderboardsController extends Controller
{
    public function index()
    {
        return Player::first()->update(['duration' => 19]);
        return view('admin.leaderboards.index');
    }

    public function fake(Request $request)
    {
        (new Player)->fake($request->game);

        return back()->with('success', 'The fake player was successully created');
    }

    public function destroy(Player $player)
    {
        $player->delete();

        return back()->with('success', 'The entry was successully deleted');
    }
}
