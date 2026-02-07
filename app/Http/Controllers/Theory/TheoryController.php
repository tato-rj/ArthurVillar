<?php

namespace App\Http\Controllers\Theory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TheoryController extends Controller
{
    public function index()
    {
        return view('theory.index');
    }
}
