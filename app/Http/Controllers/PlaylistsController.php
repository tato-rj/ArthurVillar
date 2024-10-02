<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Playlist;

class PlaylistsController extends Controller
{
    public function index()
    {
        $playlists = Playlist::withCount('recordings')->paginate(8);

        return view('playlists.index', compact('playlists'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        $playlist = Playlist::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return back()->with('success', 'The playlist was successully created');
    }

    public function show(Playlist $playlist)
    {
        
    }

    public function update(Request $request, Playlist $playlist)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        $playlist->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return back()->with('success', 'The playlist was successully updated');
    }

    public function destroy(Playlist $playlist)
    {
        
    }
}
