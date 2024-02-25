<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Book, Track};

class TracksController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except' => ['listen']
        ]);
    }

    public function store(Request $request, Book $book)
    {
        $track = $book->tracks()->create([
            'name' => $request->name,
            'composer' => $request->composer,
            'order' => $book->tracks_count
        ]);

        $track->saveAudio($request->audio_path);

        return back()->with('success', 'The track was successully created');
    }

    public function update(Request $request, Book $book, Track $track)
    {
        $track->update([
            'name' => $request->name,
            'composer' => $request->composer
        ]);

        if ($request->audio_path != $track->audio_path) {
            if (\Storage::disk('public')->exists($track->audio_path))
                \Storage::disk('public')->delete($track->audio_path);

            $track->saveAudio($request->audio_path);
        }

        return back()->with('success', 'The track was successully updated');
    }

    public function listen(Book $book, Track $track)
    {
        $track->increment('listen_count');

        return response(200);
    }

    public function reorder(Request $request, Book $book)
    {
        foreach ($request->ids as $index => $id) {
            Track::findOrFail($id)->update(['order' => $index]);
        }

        return response(200);
    }

    public function youtube(Request $request, Book $book)
    {
        $code = \Artisan::call('youtube:mp3', [
            'url' => $request->youtubeUrl,
            'folder' => 'tracks'
        ]);

        $response = \Artisan::output();
        
        if ($code > 0)
            return response($response, 500);
        
        return response()->json([
            'feedback' => 'All set!',
            'path' => $response
        ]);
    }
    
    public function destroy(Request $request, Book $book, Track $track)
    {
        $track->delete();
        
        if (\Storage::disk('public')->exists($track->audio_path))
            \Storage::disk('public')->delete($track->audio_path);

        return back()->with('success', 'The track was successully removed');
    }
}

