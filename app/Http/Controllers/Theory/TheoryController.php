<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsLabSettings, ChordsLabSettings, PitchDetectiveSettings, ToneTrekSettings, ToneTrailSettings};

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

    public function intervalsLab(Request $request)
    {
        $settings = new IntervalsLabSettings($request->all());

        return view('theory.intervals-lab.index', compact('settings'));
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

    public function snake(Request $request)
    {
        $settings = new PitchDetectiveSettings($request->all());

        return view('theory.snake.index', compact('settings'));
    }
}
