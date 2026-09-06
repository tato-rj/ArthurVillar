<?php

namespace App\Http\Controllers\Piano;

use App\Http\Controllers\Controller;

class PianoController extends Controller
{
    public function index()
    {
        return view('piano.index');
    }
}
