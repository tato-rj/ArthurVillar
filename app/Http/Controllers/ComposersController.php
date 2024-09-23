<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Composer;

class ComposersController extends Controller
{
    public function index()
    {
        $composers = Composer::orderBy('period_id');

        return view('composers.index', compact('composers'));
    }

    public function store(Request $request)
    {
        
    }

    public function show(Composer $composer)
    {
        
    }

    public function edit(Request $request, Composer $composer)
    {
        
    }

    public function destroy(Composer $composer)
    {
        
    }
}
