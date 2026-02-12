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
}
