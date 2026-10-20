<?php

namespace App\Http\Controllers\Metronome;

use App\Http\Controllers\Controller;

class MetronomeController extends Controller
{
    public function index()
    {
        return view('metronome.index');
    }
}
