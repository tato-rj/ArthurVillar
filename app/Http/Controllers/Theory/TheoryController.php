<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Games\{IntervalsLabSettings, ChordsLabSettings, PitchDetectiveSettings, ToneTrekSettings, NotePythonSettings, KeysLabSettings, NoteNestSettings, MemoryWizardSettings, ModesMasterSettings, OpenStaffSettings, BeatHeroSettings};

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
            new NoteNestSettings,
            new MemoryWizardSettings,
            new BeatHeroSettings
        ];

        return view('theory.index', compact('games'));
    }

    public function intervalsLab(Request $request)
    {
        $settings = new IntervalsLabSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.intervals-lab.index', compact(['settings','leaderboard']));
    }

    public function keysLab(Request $request)
    {
        $settings = new KeysLabSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.keys-lab.index', compact(['settings','leaderboard']));
    }

    public function toneTrek(Request $request)
    {
        $settings = new ToneTrekSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.tone-trek.index', compact(['settings','leaderboard']));
    }

    public function chordsLab(Request $request)
    {
        $settings = new ChordsLabSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.chords-lab.index', compact(['settings','leaderboard']));
    }

    public function pitchDetective(Request $request)
    {
        $settings = new PitchDetectiveSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.pitch-detective.index', compact(['settings','leaderboard']));
    }

    public function notePython(Request $request)
    {
        $settings = new NotePythonSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.note-python.index', compact(['settings','leaderboard']));
    }

    public function noteNest(Request $request)
    {
        $settings = new NoteNestSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.note-nest.index', compact(['settings','leaderboard']));
    }

    public function memoryWizard(Request $request)
    {
        $settings = new MemoryWizardSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.memory-wizard.index', compact(['settings','leaderboard']));
    }

    public function beatHero(Request $request)
    {
        $settings = new BeatHeroSettings($request->all());
        $leaderboard = Player::byGame($settings->gameName())->orderBy('finalScore', 'DESC')->get();

        return view('theory.beat-hero.index', compact(['settings','leaderboard']));
    }

    public function openStaff(Request $request)
    {
        $settings = new OpenStaffSettings($request->all());

        return view('theory.open-staff.index', compact('settings'));
    }
}
