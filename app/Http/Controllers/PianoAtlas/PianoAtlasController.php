<?php

namespace App\Http\Controllers\PianoAtlas;

use App\Http\Controllers\Controller;

class PianoAtlasController extends Controller
{
    public function grand()
    {
        return view('pianoatlas.grand.index');
    }
    public function upright()
    {
        return view('pianoatlas.upright.index');
    }
    public function action()
    {
        return view('pianoatlas.action.index');
    }
}
