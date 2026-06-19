<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Games\{IntervalsLabSettings, ChordsLabSettings, PitchDetectiveSettings, ChordDetectiveSettings, ToneTrekSettings, NotePythonSettings, KeysLabSettings, NoteNestSettings, NoteMatchSettings, MemoryWizardSettings, ModesMasterSettings, OpenStaffSettings, BeatHeroSettings};

class TheoryController extends Controller
{
    public function index(Request $request)
    {
        return view('theory.index');
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

    public function chordDetective(Request $request)
    {
        $settings = new ChordDetectiveSettings($request->all());

        return view('theory.chord-detective.index', compact('settings'));
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

    public function noteMatch(Request $request)
    {
        $settings = new NoteMatchSettings($request->all());

        return view('theory.note-match.index', compact('settings'));
    }

    public function memoryWizard(Request $request)
    {
        $settings = new MemoryWizardSettings($request->all());

        return view('theory.memory-wizard.index', compact('settings'));
    }

    public function beatHero(Request $request)
    {
        $settings = new BeatHeroSettings($request->all());

        return view('theory.beat-hero.index', compact('settings'));
    }

    public function openStaff(Request $request)
    {
        $settings = new OpenStaffSettings($request->all());

        return view('theory.open-staff.index', compact('settings'));
    }
}
