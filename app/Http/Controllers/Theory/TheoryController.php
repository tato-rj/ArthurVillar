<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalsChallengeSettings, ChordsChallengeSettings};

class TheoryController extends Controller
{
    public function index()
    {
        $intervalsChallenge = new IntervalsChallengeSettings;
        $chordsChallenge = new ChordsChallengeSettings;

        return view('theory.index', compact('intervalsChallenge', 'chordsChallenge'));
    }

    public function intervals(Request $request)
    {
        $challenge = new IntervalsChallengeSettings($request->all());

        return view('theory.intervals.index', compact('challenge'));
    }

    public function chords(Request $request)
    {
        $challenge = new ChordsChallengeSettings($request->all());
// return $challenge->options();
        return view('theory.chords.index', compact('challenge'));
    }
}
