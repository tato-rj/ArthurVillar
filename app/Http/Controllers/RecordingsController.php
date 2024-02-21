<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SuzukiBooks\Recordings;
use Symfony\Component\Process\Process;

class RecordingsController extends Controller
{
    public function index()
    {
        // dd(get_class_methods(new Process([])));
        return view('recordings.index');
    }

    public function book($name)
    {
        $book = (new Recordings)->book($name)->get();

        return view('recordings.show.index', compact('book'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'file' => 'required|mimes:mp3'
        ]);
    }
}
