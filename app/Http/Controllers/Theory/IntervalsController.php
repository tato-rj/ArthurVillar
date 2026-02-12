<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Games\Intervals\IntervalChallenge;

class IntervalsController extends Controller
{
    public function index(Request $request)
    {
        $challenge = new IntervalChallenge($request->all());

        return view('theory.intervals.index', compact('challenge'));
    }
}
