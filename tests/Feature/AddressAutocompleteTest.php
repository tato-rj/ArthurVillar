<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\BaseTest;

class AddressAutocompleteTest extends BaseTest
{
    /** @test */
    public function it_returns_google_address_suggestions_and_populates_address_components()
    {
        config(['calendar.google_places.api_key' => 'places-test-key']);
        $this->signIn();

        Http::fake([
            'https://places.googleapis.com/v1/places:autocomplete' => Http::response([
                'suggestions' => [[
                    'placePrediction' => [
                        'placeId' => 'place-123',
                        'text' => ['text' => '80 Erie St, Jersey City, NJ, USA'],
                        'structuredFormat' => [
                            'mainText' => ['text' => '80 Erie St'],
                            'secondaryText' => ['text' => 'Jersey City, NJ, USA'],
                        ],
                    ],
                ]],
            ]),
            'https://places.googleapis.com/v1/places/place-123*' => Http::response([
                'formattedAddress' => '80 Erie St, Jersey City, NJ 07302, USA',
                'postalAddress' => [
                    'addressLines' => ['80 Erie St'],
                    'locality' => 'Jersey City',
                    'administrativeArea' => 'NJ',
                    'postalCode' => '07302',
                ],
            ]),
        ]);

        $token = '45c3bc35-b981-41ca-aec4-f70e1e05679f';

        $this->postJson(route('calendar.address-autocomplete.search'), [
            'input' => '80 Erie',
            'session_token' => $token,
        ])
            ->assertOk()
            ->assertJsonPath('configured', true)
            ->assertJsonPath('suggestions.0.place_id', 'place-123')
            ->assertJsonPath('suggestions.0.main_text', '80 Erie St');

        $this->postJson(route('calendar.address-autocomplete.details'), [
            'place_id' => 'place-123',
            'session_token' => $token,
        ])
            ->assertOk()
            ->assertJsonPath('address.address', '80 Erie St')
            ->assertJsonPath('address.city', 'Jersey City')
            ->assertJsonPath('address.state', 'NJ')
            ->assertJsonPath('address.postal_code', '07302');

        Http::assertSent(function (Request $request) use ($token) {
            return $request->url() === 'https://places.googleapis.com/v1/places:autocomplete'
                && $request->hasHeader('X-Goog-Api-Key', 'places-test-key')
                && $request['sessionToken'] === $token
                && $request['includedRegionCodes'] === ['us'];
        });
    }

    /** @test */
    public function address_forms_use_the_shared_autocomplete_fields_and_state_select()
    {
        $this->signIn();

        $this->get(route('calendar.locations.index'))
            ->assertOk()
            ->assertSee('data-address-fields', false)
            ->assertSee('data-address-search-url', false)
            ->assertSee('<select', false)
            ->assertSee('name="state"', false)
            ->assertSee('value="NY"', false)
            ->assertSee('New York');

        $this->get(route('calendar.events.index'))
            ->assertOk()
            ->assertSee('data-address-fields', false)
            ->assertSee('autocomplete="street-address"', false)
            ->assertSee('autocomplete="address-level1"', false);
    }
}
