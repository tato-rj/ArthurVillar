<?php

namespace App\Http\Controllers\Studio;

use App\Calendar\Scheduler;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TeachingBreak;

class TeachingBreaksController extends Controller
{
    public function index()
    {
        return view('studio.breaks.index');
    }

    public function store(Request $request)
    {
        TeachingBreak::create($this->validatedBreak($request));

        return back()->with('success', 'The teaching break was successfully created');
    }

    public function update(Request $request, TeachingBreak $break)
    {
        $break->update($this->validatedBreak($request));

        return back()->with('success', 'The teaching break was successfully updated');
    }

    public function destroy(TeachingBreak $break)
    {
        $break->delete();

        return back()->with('success', 'The teaching break was successfully deleted');
    }

    public function impact(Request $request, Scheduler $scheduler)
    {
        $data = $request->validate([
            'starts_on' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'ends_on' => ['required', 'date_format:Y-m-d', 'after_or_equal:starts_on'],
        ]);

        return response()->json($scheduler->breakImpact($data['starts_on'], $data['ends_on']));
    }

    private function validatedBreak(Request $request)
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'reason' => ['nullable', 'string'],
            'starts_on' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'ends_on' => ['required', 'date_format:Y-m-d', 'after_or_equal:starts_on'],
        ]);
    }
}
