<?php

namespace App\Http\Controllers\Listening;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Listening\{Recording, Period, Composer, Playlist};
use App\Tools\Cropper\ImageUpload;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RecordingsController extends Controller
{
    public function index()
    {        
        $recordings = Recording::paginate(12);
        $playlists = Playlist::latest()->get();

        return view('listening.recordings.index', compact(['recordings', 'playlists']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500',
            'youtube_url' => 'required|url',
            'start_time' => 'nullable|string',
            'end_time' => 'nullable|string',
            'period_id' => 'required',
            'composer_id' => 'required'
        ]);

        $audioPath = $this->convertYoutubeToMp3($request);

        $recording = Recording::create([
            'name' => $request->name,
            'composer_id' => $request->composer_id,
            'artist' => $request->artist,
            'composed_in' => $request->composed_in,
            'source_url' => $request->youtube_url,
            'description' => $request->description,
            'ensemble_type' => $request->ensemble_type,
            'period_id' => $request->period_id,
            'audio_path' => $audioPath
        ]);

        if ($file = $request->file('cover'))
            $recording->update(['cover_path' => (new ImageUpload($request))->take('cover')
                                                       ->model($recording)
                                                       ->folder('recordings/covers')
                                                       ->cropped()
                                                       ->upload()]);

        return back()->with('success', 'The recording was successully uploaded');
    }

    public function convertYoutubeToMp3(Request $request)
    {
        $code = \Artisan::call('youtube:mp3', [
            'url' => $request->youtube_url,
            'folder' => 'recordings/audio',
            'start' => $request->start_time,
            'end' => $request->end_time
        ]);

        $output = trim(\Artisan::output());

        if ($code > 0)
            back()->withInput()->withErrors(['youtube_url' => $output ?: 'The YouTube conversion failed.'])->throwResponse();

        return $output;
    }
    
    public function edit(Recording $recording)
    {
        $periods = Period::orderBy('starts_in')->get();

        return view('listening.recordings.edit.index', compact(['recording', 'periods']));
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

    public function syncPlaylists(Request $request, Recording $recording)
    {
        $recording->playlists()->sync($request->playlists);
        
        return back()->with('success', 'The recording was successully updated');
    }

    public function destroy(Recording $recording)
    {
        $recording->delete();

        return redirect(route('listening.recordings.index'))->with('success', 'The recording was successfully deleted');
    }
}
