<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Recording, Period};
use App\Tools\Cropper\ImageUpload;

use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RecordingsController extends Controller
{
    public function index()
    {
        $periods = Period::orderBy('starts_in')->get();
        $recordings = Recording::orderBy('composed_in')->get();
foreach ($recordings as $recording) {
    if (\Storage::disk('public')->exists($recording->cover_path))
        \Storage::disk('public')->delete($recording->cover_path);
}
        return view('recordings.index', compact(['recordings', 'periods']));
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
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500',
            'audio' => 'required|mimes:mp3',
            'period_id' => 'required'
        ]);

        $recording = Recording::create([
            'name' => $request->name,
            'composer' => $request->composer,
            'artist' => $request->artist,
            'composed_in' => $request->composed_in,
            'source_url' => $request->source_url,
            'description' => $request->description,
            'period_id' => $request->period_id,
            'audio_path' => $request->file('audio')->store('recordings/audio', 'public')
        ]);

        if ($file = $request->file('cover'))
            $recording->update(['cover_path' => (new ImageUpload($request))->take('cover')
                                                       ->model($recording)
                                                       ->folder('recordings/covers')
                                                       ->cropped()
                                                       ->upload()]);

        return back()->with('success', 'The recording was successully uploaded');
    }

    public function edit(Recording $recording)
    {
        $periods = Period::orderBy('starts_in')->get();

        return view('recordings.edit', compact(['recording', 'periods']));
    }

    public function update(Request $request, Recording $recording)
    {
        $request->validate([
            'name' => 'required',
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500',
            'audio' => 'sometimes|mimes:mp3',
            'period_id' => 'required'
        ]);

        $recording->update([
            'name' => $request->name,
            'composer' => $request->composer,
            'artist' => $request->artist,
            'composed_in' => $request->composed_in,
            'source_url' => $request->source_url,
            'description' => $request->description,
            'period_id' => $request->period_id,
        ]);

        if ($file = $request->file('audio'))
            $recording->update([
                'audio_path' => $request->file('audio')->store('recordings/audio', 'public')
            ]);

        if ($file = $request->file('cover'))
            $recording->update(['cover_path' => (new ImageUpload($request))->take('cover')
                                                       ->model($recording)
                                                       ->folder('recordings/covers')
                                                       ->cropped()
                                                       ->upload()]);

        return back()->with('success', 'The recording was successully updated');
    }

    public function destroy(Recording $recording)
    {
        $recording->delete();

        return redirect(route('admin.recordings.index'))->with('success', 'The recording was successfully deleted');
    }
}
