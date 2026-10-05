<?php

namespace App\Http\Controllers\Admin\Theory;

use App\Http\Controllers\Controller;

class TheoryController extends Controller
{
    public function audio()
    {
        return view('admin.theory.audio.index');
    }

    public function tournaments()
    {
        return view('admin.theory.tournaments.index');
    }

    public function stats()
    {
        return view('admin.theory.stats.index');
    }
}
