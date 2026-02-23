<?php

namespace App\Http\Controllers\Listening;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Playlist;

class PlaylistsController extends Controller
{
    public function index()
    {
        $playlists = Playlist::paginate(8);

        return view('admin.listening.playlists.index', compact('playlists'));
    }

    public function recordings(Playlist $playlist)
    {
        $playlists = Playlist::all();

        return view('admin.listening.playlists.recordings.index', compact(['playlist', 'playlists']));
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

    public function secret(Request $request, Playlist $playlist)
    {
        $playlist->renewSecret();

        return back()->with('success', 'The secret was successully updated');
    }

    public function destroy(Playlist $playlist)
    {
        $playlist->delete();

        return back()->with('success', 'The playlist was successully deleted');
    }
}
