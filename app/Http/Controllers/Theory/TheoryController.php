<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsLabSettings, ChordsLabSettings, PitchDetectiveSettings, ToneTrekSettings, NotePythonSettings, KeysLabSettings, NoteNestSettings, ModesMasterSettings};

class TheoryController extends Controller
{
    public function index()
    {
        $games = [
            new IntervalsLabSettings,
            new ChordsLabSettings,
            new PitchDetectiveSettings,
            new ToneTrekSettings,
            new NotePythonSettings,
            new KeysLabSettings,
            new NoteNestSettings
        ];

        return view('theory.index', compact('games'));
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

    public function noteNest(Request $request)
    {
        $settings = new NoteNestSettings($request->all());

        return view('theory.note-nest.index', compact('settings'));
    }
}
