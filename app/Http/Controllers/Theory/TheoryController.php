<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsBuilderSettings, ChordsBuilderSettings, IntervalsDictationSettings};

class TheoryController extends Controller
{
    public function index()
    {
        $intervalsBuilderSettings = new IntervalsBuilderSettings;
        $chordsBuilderSettings = new ChordsBuilderSettings;
        $intervalsDictationSettings = new IntervalsDictationSettings;

        return view('theory.index', compact('intervalsBuilderSettings', 'chordsBuilderSettings', 'intervalsDictationSettings'));
    }

    public function intervals(Request $request)
    {
        $settings = new IntervalsBuilderSettings($request->all());

        return view('theory.intervals.index', compact('settings'));
    }

    public function chords(Request $request)
    {
        $settings = new ChordsBuilderSettings($request->all());

        return view('theory.chords.index', compact('settings'));
    }

    public function dictation(Request $request)
    {
        $settings = new IntervalsDictationSettings($request->all());

        return view('theory.dictation.index', compact('settings'));
    }
}
