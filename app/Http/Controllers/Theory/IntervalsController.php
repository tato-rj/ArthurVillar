<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IntervalsController extends Controller
{
    public function index()
    {
        return view('theory.intervals.index');
    }
}
