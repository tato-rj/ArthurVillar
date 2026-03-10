<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsLabSettings, ChordsLabSettings, PitchDetectiveSettings, ToneTrekSettings, NotePythonSettings, KeysLabSettings};

class TheoryController extends Controller
{
    public function index()
    {
        $intervalsLabSettings = new IntervalsLabSettings;
        $chordsLabSettings = new ChordsLabSettings;
        $pitchDetectiveSettings = new PitchDetectiveSettings;
        $toneTrekSettings = new ToneTrekSettings;
        $notePythonSettings = new NotePythonSettings;
        $keysLabSettings = new KeysLabSettings;

        return view('theory.index', compact('intervalsLabSettings', 'chordsLabSettings', 'pitchDetectiveSettings', 'toneTrekSettings', 'notePythonSettings', 'keysLabSettings'));
    }

    public function intervalsLab(Request $request)
    {
        $settings = new IntervalsLabSettings($request->all());

        return view('theory.intervals-lab.index', compact('settings'));
    }

    public function keysLab(Request $request)
    {
        $settings = new KeysLabSettings($request->all());

        return view('theory.keys-lab.index', compact('settings'));
    }

    public function toneTrek(Request $request)
    {
        $settings = new ToneTrekSettings($request->all());

        return view('theory.tone-trek.index', compact('settings'));
    }

    public function chordsLab(Request $request)
    {
        $settings = new ChordsLabSettings($request->all());

        return view('theory.chords-lab.index', compact('settings'));
    }

    public function pitchDetective(Request $request)
    {
        $settings = new PitchDetectiveSettings($request->all());

        return view('theory.pitch-detective.index', compact('settings'));
    }

    public function notePython(Request $request)
    {
        $settings = new NotePythonSettings($request->all());

        return view('theory.note-python.index', compact('settings'));
    }
}
