<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\Venue;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VenuesController extends Controller
{
    public function index()
    {
        return view('calendar.venues.index');
    }

    public function store(Request $request)
    {
        Venue::create($this->validatedVenue($request));

        return back()->with('success', 'The venue was successfully added');
    }

    public function edit(Venue $venue)
    {
        return view('calendar.venues.edit', compact('venue'));
    }

    public function update(Request $request, Venue $venue)
    {
        $venue->update($this->validatedVenue($request, $venue));

        return back()->with('success', 'The venue was successfully updated');
    }

    public function destroy(Venue $venue)
    {
        $venue->delete();

        return back()->with('success', 'The venue was successfully deleted');
    }

    private function validatedVenue(Request $request, Venue $venue = null)
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('venues')->ignore($venue)],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'map_url' => ['nullable', 'url', 'regex:/^https?:\/\//i', 'max:2048'],
        ]);
    }
}
