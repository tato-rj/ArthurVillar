<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recording;
use App\Tools\Cropper\ImageUpload;

use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RecordingsController extends Controller
{
    public function index()
    {
        $recordings = Recording::all();

        return view('recordings.index', compact('recordings'));
    }

    public function play(Recording $recording)
    {
        return view('recordings.play', compact('recording'));
    }

    public function qrcode(Recording $recording)
    {
        $filename = str_slug($recording->nameWithComposer).'.png';

        return response()->streamDownload(function () use ($recording) {
            echo $recording->qrcode('png');
        }, $filename, ['Content-Type' => 'image/png']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500'
        ]);

        $recording = Recording::create([
            'name' => $request->name,
            'composer' => $request->composer,
            'artist' => $request->artist,
            // 'cover_path' => $request->file('cover')->store('covers', 'public')
        ]);

        if ($file = $request->file('cover'))
            $recording->update(['cover_path' => (new ImageUpload($request))->take('cover')
                                                       ->model($recording)
                                                       ->folder('recordings/covers')
                                                       ->cropped()
                                                       ->upload()]);

        $recording->saveAudio($request->audio_path);

        return back()->with('success', 'The recording was successully uploaded');
    }

    public function youtubeToAudio(Request $request)
    {
        $code = \Artisan::call('youtube:mp3', [
            'url' => $request->youtubeUrl,
            'folder' => 'recordings',
            'start' => $request->start,
            'end' => $request->end
        ]);

        $response = \Artisan::output();
        
        if ($code > 0)
            return response($response, 500);
        
        return response()->json([
            'feedback' => 'All set!',
            'path' => $response
        ]);
    }

    public function edit(Recording $recording)
    {
        return view('recordings.edit', compact('recording'));
    }

    public function destroy(Recording $recording)
    {
        $recording->delete();

        return back()->with('success', 'The recording was successfully deleted');
    }
}
