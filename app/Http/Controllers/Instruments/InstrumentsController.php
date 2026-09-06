<?php

namespace App\Http\Controllers\Instruments;

use App\Http\Controllers\Controller;

class InstrumentsController extends Controller
{
    public function piano()
    {
        return view('instruments.piano.index');
    }
}
