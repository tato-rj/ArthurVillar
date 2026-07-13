<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VenuesController extends Controller
{
    public function index()
    {
        return view('studio.venues.index');
    }

    public function store(Request $request)
    {
        Venue::create($this->validatedVenue($request));

        return back()->with('success', 'The venue was successfully added');
    }

    public function edit(Venue $venue)
    {
        return view('studio.venues.edit', compact('venue'));
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
            'address_line_1' => ['nullable', 'string', 'max:255'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
        ]);
    }
}
