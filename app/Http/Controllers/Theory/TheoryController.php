<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\Intervals\IntervalChallenge;

class TheoryController extends Controller
{
    public function index()
    {
        $challenge = new IntervalChallenge;

        return view('theory.index', compact('challenge'));
    }

    public function intervals(Request $request)
    {
        $challenge = new IntervalChallenge($request->all());

        return view('theory.intervals.index', compact('challenge'));
    }

    public function chords(Request $request)
    {
        $challenge = new IntervalChallenge($request->all());

        return view('theory.chords.index', compact('challenge'));
    }
}
