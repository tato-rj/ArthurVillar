<?php

namespace App\Http\Controllers\Calendar;

use App\Models\Calendar\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class LocationsController extends Controller
{
    public function index()
    {
        return view('calendar.locations.index');
    }

    public function store(Request $request)
    {
        Location::create($this->locationAttributes($this->validatedLocation($request)));

        return back()->with('success', 'The location was successfully added');
    }

    public function edit(Location $location)
    {
        return view('calendar.locations.edit', compact('location'));
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
            'usage' => ['required', Rule::in(Location::usages())],
            'fee_amount' => ['nullable', 'string'],
            'tax_withheld_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'is_active' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string'],
        ]);
    }

    private function locationAttributes(array $data)
    {
        return [
            'name' => $data['name'],
            'usage' => $data['usage'],
            'fee_amount' => $this->feeAmount($data['fee_amount'] ?? null),
            'tax_withheld_percentage' => $data['tax_withheld_percentage'] ?? 0,
            'address' => $data['address'] ?? null,
            'city' => $data['city'] ?? null,
            'state' => $data['state'] ?? null,
            'postal_code' => $data['postal_code'] ?? null,
            'is_active' => $data['is_active'] ?? false,
            'notes' => $data['notes'] ?? null,
        ];
    }

    private function feeAmount($value)
    {
        $value = preg_replace('/[^0-9]/', '', (string) $value);

        return $value === '' ? null : ((int) $value) * 100;
    }
}
