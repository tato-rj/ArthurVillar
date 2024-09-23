<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Playlist;

class PlaylistController extends Controller
{
    public function index()
    {
        $playlists = Playlist::orderBy('period_id');

        return view('playlists.index', compact('playlists'));
    }

    public function store(Request $request)
    {
        
    }

    public function show(Playlist $playlist)
    {
        
    }

    public function edit(Request $request, Playlist $playlist)
    {
        
    }

    public function destroy(Playlist $playlist)
    {
        
    }
}
