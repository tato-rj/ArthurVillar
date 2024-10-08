<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Recording, Period, Composer, Playlist};
use App\Tools\Cropper\ImageUpload;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RecordingsController extends Controller
{
    public function index()
    {
        $recordings = Recording::latest()->paginate(12);
        $playlists = Playlist::latest()->get();

        return view('recordings.index', compact(['recordings', 'playlists']));
    }

    public function qrcode(Request $request, Recording $recording)
    {
        $filename = str_slug($recording->nameWithComposer).'.png';

        return response()->streamDownload(function () use ($request) {
            $qrcode = QrCode::size(500)->format('png')->margin(1)->errorCorrection('M');

            echo $qrcode->generate($request->url);
        }, $filename, ['Content-Type' => 'image/png']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500',
            'audio' => 'required|mimes:mp3',
            'period_id' => 'required',
            'composer_id' => 'required'
        ]);

        $recording = Recording::create([
            'name' => $request->name,
            'composer_id' => $request->composer_id,
            'artist' => $request->artist,
            'composed_in' => $request->composed_in,
            'source_url' => $request->source_url,
            'description' => $request->description,
            'ensemble_type' => $request->ensemble_type,
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

        return view('recordings.edit.index', compact(['recording', 'periods']));
    }

    public function update(Request $request, Recording $recording)
    {
        $request->validate([
            'name' => 'required',
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500',
            'audio' => 'sometimes|mimes:mp3',
            'period_id' => 'required',
            'composer_id' => 'required'
        ]);

        $recording->update([
            'name' => $request->name,
            'composer_id' => $request->composer_id,
            'artist' => $request->artist,
            'composed_in' => $request->composed_in,
            'source_url' => $request->source_url,
            'description' => $request->description,
            'ensemble_type' => $request->ensemble_type,
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

    public function playlists(Request $request, Recording $recording)
    {
        $recording->playlists()->sync($request->playlists);
        
        return back()->with('success', 'The recording was successully updated');
    }

    public function destroy(Recording $recording)
    {
        $recording->delete();

        return redirect(route('admin.recordings.index'))->with('success', 'The recording was successfully deleted');
    }
}
