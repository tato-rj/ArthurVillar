<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Services\GooglePlacesClient;
use Illuminate\Http\Request;

class AddressAutocompleteController extends Controller
{
    public function search(Request $request, GooglePlacesClient $places)
    {
        $data = $request->validate([
            'input' => ['required', 'string', 'min:3', 'max:255'],
            'session_token' => ['required', 'string', 'max:36'],
        ]);

        return response()->json([
            'configured' => $places->isConfigured(),
            'suggestions' => $places->autocomplete($data['input'], $data['session_token']),
        ]);
    }

    public function details(Request $request, GooglePlacesClient $places)
    {
        $data = $request->validate([
            'place_id' => ['required', 'string', 'max:255'],
            'session_token' => ['required', 'string', 'max:36'],
        ]);

        $address = $places->details($data['place_id'], $data['session_token']);

        return $address
            ? response()->json(['address' => $address])
            : response()->noContent();
    }
}
