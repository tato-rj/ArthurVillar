<?php

namespace App\Http\Controllers\Admin\Theory;

use App\Http\Controllers\Controller;
use App\Models\Theory\Player;
use Illuminate\Http\Request;

class LeaderboardsController extends Controller
{
    public function index()
    {
        return view('admin.theory.leaderboards.index');
    }

    public function show(Request $request)
    {
        $leaderboard = Player::byGame($request->game)
            ->range($request->range)
            ->orderBy('finalScore', 'DESC')
            ->take(20)
            ->get();

        return view('admin.theory.leaderboards.list', compact('leaderboard'));
    }

    public function destroy(Player $player)
    {
        $player->delete();

        return back()->with('success', 'The entry was successfully deleted');
    }
}
