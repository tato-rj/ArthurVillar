<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\{IntervalChallenge, ChordsChallenge};

class TheoryController extends Controller
{
    public function index()
    {
        $intervalsChallenge = new IntervalChallenge;
        $chordsChallenge = new ChordsChallenge;

        return view('theory.index', compact('intervalsChallenge', 'chordsChallenge'));
    }

    public function intervals(Request $request)
    {
        $challenge = new IntervalChallenge($request->all());

        return view('theory.intervals.index', compact('challenge'));
    }

    public function chords(Request $request)
    {
        $challenge = new ChordsChallenge($request->all());
// return $challenge->options();
        return view('theory.chords.index', compact('challenge'));
    }
}
