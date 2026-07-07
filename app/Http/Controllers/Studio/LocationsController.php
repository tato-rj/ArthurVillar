<?php

namespace App\Http\Controllers\Studio;

use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class LocationsController extends Controller
{
    public function index()
    {
        return view('studio.locations.index');
    }

    public function store(Request $request)
    {
        Location::create($this->locationAttributes($this->validatedLocation($request)));

        return back()->with('success', 'The location was successfully added');
    }

    public function edit(Location $location)
    {
        return view('studio.locations.edit', compact('location'));
    }

    public function update(Request $request, Location $location)
    {
        $location->update($this->locationAttributes($this->validatedLocation($request, $location)));

        return back()->with('success', 'The location was successfully updated');
    }

    public function destroy(Location $location)
    {
        $location->delete();

        return back()->with('success', 'The location was successfully deleted');
    }

    private function validatedLocation(Request $request, Location $location = null)
    {
        return $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('locations')->ignore($location),
            ],
            'tax_withheld_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'is_active' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string'],
        ]);
    }

    private function locationAttributes(array $data)
    {
        return [
            'name' => $data['name'],
            'tax_withheld_percentage' => $data['tax_withheld_percentage'] ?? 0,
            'is_active' => $data['is_active'] ?? false,
            'notes' => $data['notes'] ?? null,
        ];
    }
}
