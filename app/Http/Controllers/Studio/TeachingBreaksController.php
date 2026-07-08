<?php

namespace App\Http\Controllers\Studio;

use App\Calendar\Scheduler;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{Location, TeachingBreak};

class TeachingBreaksController extends Controller
{
    public function index()
    {
        $locations = Location::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return view('studio.breaks.index', compact('locations'));
    }

    public function store(Request $request)
    {
        $data = $this->validatedBreak($request);
        $break = TeachingBreak::create($this->breakAttributes($data));
        $break->locations()->sync($data['location_ids'] ?? []);

        return back()->with('success', 'The teaching break was successfully created');
    }

    public function update(Request $request, TeachingBreak $break)
    {
        $data = $this->validatedBreak($request);
        $break->update($this->breakAttributes($data));
        $break->locations()->sync($data['location_ids'] ?? []);

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
            'location_ids' => ['nullable', 'array'],
            'location_ids.*' => ['integer', 'exists:locations,id'],
        ]);

        return response()->json($scheduler->breakImpact($data['starts_on'], $data['ends_on'], $data['location_ids'] ?? []));
    }

    private function validatedBreak(Request $request)
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'reason' => ['nullable', 'string'],
            'starts_on' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'ends_on' => ['required', 'date_format:Y-m-d', 'after_or_equal:starts_on'],
            'location_ids' => ['nullable', 'array'],
            'location_ids.*' => ['integer', 'exists:locations,id'],
        ]);
    }

    private function breakAttributes(array $data)
    {
        return collect($data)->except('location_ids')->all();
    }
}
