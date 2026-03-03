<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsLabSettings, ChordsLabSettings, PitchDetectiveSettings, ToneTrekSettings};

class TheoryController extends Controller
{
    public function index()
    {
        $intervalsLabSettings = new IntervalsLabSettings;
        $chordsLabSettings = new ChordsLabSettings;
        $pitchDetectiveSettings = new PitchDetectiveSettings;
        $toneTrekSettings = new ToneTrekSettings;

        return view('theory.index', compact('intervalsLabSettings', 'chordsLabSettings', 'pitchDetectiveSettings', 'toneTrekSettings'));
    }

    public function intervals(Request $request)
    {
        $settings = new IntervalsLabSettings($request->all());

        return view('theory.intervals.index', compact('settings'));
    }

    public function blocks(Request $request)
    {
        $settings = new ToneTrekSettings($request->all());

        return view('theory.blocks.index', compact('settings'));
    }

    public function chords(Request $request)
    {
        $settings = new ChordsLabSettings($request->all());

        return view('theory.chords.index', compact('settings'));
    }

    public function dictation(Request $request)
    {
        $settings = new PitchDetectiveSettings($request->all());

        return view('theory.dictation.index', compact('settings'));
    }
}
