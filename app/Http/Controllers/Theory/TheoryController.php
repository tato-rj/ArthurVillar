<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsSettings, ChordsSettings, DictationSettings};

class TheoryController extends Controller
{
    public function index()
    {
        $intervalsSettings = new IntervalsSettings;
        $chordsSettings = new ChordsSettings;
        $dictationSettings = new DictationSettings;

        return view('theory.index', compact('intervalsSettings', 'chordsSettings', 'dictationSettings'));
    }

    public function intervals(Request $request)
    {
        $settings = new IntervalsSettings($request->all());

        return view('theory.intervals.index', compact('settings'));
    }

    public function chords(Request $request)
    {
        $settings = new ChordsSettings($request->all());

        return view('theory.chords.index', compact('settings'));
    }

    public function dictation(Request $request)
    {
        $settings = new DictationSettings($request->all());

        return view('theory.dictation.index', compact('settings'));
    }
}
