<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Throwable;

class GooglePlacesClient
{
    private const AUTOCOMPLETE_ENDPOINT = 'https://places.googleapis.com/v1/places:autocomplete';

    private const AUTOCOMPLETE_FIELDS = 'suggestions.placePrediction.placeId,'
        .'suggestions.placePrediction.text.text,'
        .'suggestions.placePrediction.structuredFormat.mainText.text,'
        .'suggestions.placePrediction.structuredFormat.secondaryText.text';

    private const DETAILS_FIELDS = 'formattedAddress,postalAddress,addressComponents';

    public function isConfigured(): bool
    {
        return filled(config('calendar.google_places.api_key'));
    }

    public function autocomplete(string $input, string $sessionToken): array
    {
        if (! $this->isConfigured()) {
            return [];
        }

        $bias = config('calendar.google_places.location_bias', []);
        $regionCode = strtolower(config('calendar.google_places.region_code', 'US'));
        $payload = [
            'input' => $input,
            'sessionToken' => $sessionToken,
            'regionCode' => $regionCode,
            'includedRegionCodes' => [$regionCode],
            'includeQueryPredictions' => false,
        ];

        if (filled($bias['latitude'] ?? null) && filled($bias['longitude'] ?? null)) {
            $radius = min(50000, max(0, (float) ($bias['radius_meters'] ?? 50000)));
            $payload['locationBias'] = [
                'circle' => [
                    'center' => [
                        'latitude' => (float) $bias['latitude'],
                        'longitude' => (float) $bias['longitude'],
                    ],
                    'radius' => $radius,
                ],
            ];
        }

        try {
            $suggestions = $this->http(self::AUTOCOMPLETE_FIELDS)
                ->post(self::AUTOCOMPLETE_ENDPOINT, $payload)
                ->throw()
                ->json('suggestions', []);
        } catch (Throwable $exception) {
            report($exception);

            return [];
        }

        return collect($suggestions)
            ->map(function (array $suggestion) {
                $prediction = $suggestion['placePrediction'] ?? [];

                return [
                    'place_id' => $prediction['placeId'] ?? null,
                    'label' => data_get($prediction, 'text.text'),
                    'main_text' => data_get($prediction, 'structuredFormat.mainText.text'),
                    'secondary_text' => data_get($prediction, 'structuredFormat.secondaryText.text'),
                ];
            })
            ->filter(fn (array $suggestion) => filled($suggestion['place_id']) && filled($suggestion['label']))
            ->take(5)
            ->values()
            ->all();
    }

    public function details(string $placeId, string $sessionToken): ?array
    {
        if (! $this->isConfigured()) {
            return null;
        }

        try {
            $place = $this->http(self::DETAILS_FIELDS)
                ->get('https://places.googleapis.com/v1/places/'.rawurlencode($placeId), [
                    'sessionToken' => $sessionToken,
                ])
                ->throw()
                ->json();
        } catch (Throwable $exception) {
            report($exception);

            return null;
        }

        if (! is_array($place)) {
            return null;
        }

        $postalAddress = $place['postalAddress'] ?? [];
        $components = collect($place['addressComponents'] ?? []);
        $component = function (string $type, string $field = 'longText') use ($components) {
            return data_get(
                $components->first(fn (array $component) => in_array($type, $component['types'] ?? [], true)),
                $field
            );
        };
        $street = collect($postalAddress['addressLines'] ?? [])->filter()->implode(' ');

        if (! $street) {
            $street = trim(collect([
                $component('street_number'),
                $component('route'),
            ])->filter()->implode(' '));
        }

        $street = $street ?: str($place['formattedAddress'] ?? '')->before(',')->trim()->toString();
        $city = $postalAddress['locality']
            ?? $component('locality')
            ?? $component('postal_town')
            ?? $component('sublocality_level_1');
        $state = $postalAddress['administrativeArea']
            ?? $component('administrative_area_level_1', 'shortText');
        $postalCode = $postalAddress['postalCode'] ?? $component('postal_code');

        return [
            'address' => $street ?: null,
            'city' => $city ?: null,
            'state' => $state ?: null,
            'postal_code' => $postalCode ?: null,
            'formatted_address' => $place['formattedAddress'] ?? null,
        ];
    }

    private function http(string $fieldMask): PendingRequest
    {
        return Http::acceptJson()
            ->asJson()
            ->timeout(8)
            ->retry(1, 200)
            ->withHeaders([
                'X-Goog-Api-Key' => config('calendar.google_places.api_key'),
                'X-Goog-FieldMask' => $fieldMask,
            ]);
    }
}
