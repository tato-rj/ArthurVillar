<?php

namespace App\Services;

use Carbon\CarbonImmutable;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Throwable;

class GoogleRoutesClient
{
    private const ENDPOINT = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    private const FIELD_MASK = 'routes.duration,routes.distanceMeters,'
        .'routes.legs.steps.travelMode,routes.legs.steps.staticDuration,'
        .'routes.legs.steps.transitDetails';

    public function isConfigured(): bool
    {
        return filled(config('calendar.google_routes.api_key'));
    }

    public function calculate(string $origin, string $destination, CarbonImmutable $arrivalAt): ?array
    {
        if (! $this->isConfigured()) {
            return null;
        }

        $walking = $this->request('WALK', $origin, $destination);
        $walkingThreshold = (int) config('calendar.google_routes.walking_threshold_minutes', 20) * 60;

        if ($walking && $walking['duration_seconds'] <= $walkingThreshold) {
            return $this->normalizeRoute($walking, 'WALK', $arrivalAt);
        }

        $transit = $this->request('TRANSIT', $origin, $destination, $arrivalAt);

        if ($transit) {
            return $this->normalizeRoute($transit, 'TRANSIT', $arrivalAt);
        }

        return $walking ? $this->normalizeRoute($walking, 'WALK', $arrivalAt) : null;
    }

    private function request(
        string $travelMode,
        string $origin,
        string $destination,
        ?CarbonImmutable $arrivalAt = null
    ): ?array {
        $payload = [
            'origin' => ['address' => $origin],
            'destination' => ['address' => $destination],
            'travelMode' => $travelMode,
            'computeAlternativeRoutes' => false,
            'languageCode' => 'en-US',
            'units' => 'IMPERIAL',
        ];

        if ($travelMode === 'TRANSIT' && $arrivalAt) {
            $payload['arrivalTime'] = $arrivalAt->utc()->format('Y-m-d\TH:i:s\Z');
        }

        try {
            $route = $this->http()
                ->post(self::ENDPOINT, $payload)
                ->throw()
                ->json('routes.0');
        } catch (Throwable $exception) {
            report($exception);

            return null;
        }

        if (! is_array($route) || empty($route['duration'])) {
            return null;
        }

        return [
            'duration_seconds' => $this->seconds($route['duration']),
            'distance_meters' => isset($route['distanceMeters']) ? (int) $route['distanceMeters'] : null,
            'steps' => $this->steps($route),
        ];
    }

    private function http(): PendingRequest
    {
        return Http::acceptJson()
            ->asJson()
            ->timeout(12)
            ->retry(2, 250)
            ->withHeaders([
                'X-Goog-Api-Key' => config('calendar.google_routes.api_key'),
                'X-Goog-FieldMask' => self::FIELD_MASK,
            ]);
    }

    private function normalizeRoute(array $route, string $travelMode, CarbonImmutable $arrivalAt): array
    {
        $duration = max(0, (int) $route['duration_seconds']);

        return [
            'travel_mode' => $travelMode,
            'duration_seconds' => $duration,
            'distance_meters' => $route['distance_meters'],
            'departure_at' => $arrivalAt->subSeconds($duration),
            'arrival_at' => $arrivalAt,
            'steps' => $route['steps'],
        ];
    }

    private function steps(array $route): array
    {
        $steps = collect(data_get($route, 'legs.0.steps', []));
        $result = [];
        $walkingSeconds = 0;
        $flushWalking = function () use (&$result, &$walkingSeconds) {
            if ($walkingSeconds <= 0) {
                return;
            }

            $result[] = ['mode' => 'WALK', 'duration_seconds' => $walkingSeconds];
            $walkingSeconds = 0;
        };

        foreach ($steps as $step) {
            if (($step['travelMode'] ?? '') !== 'TRANSIT') {
                $walkingSeconds += $this->seconds($step['staticDuration'] ?? '0s');
                continue;
            }

            $flushWalking();
            $details = $step['transitDetails'] ?? [];
            $line = $details['transitLine'] ?? [];
            $vehicle = $line['vehicle'] ?? [];

            $result[] = [
                'mode' => 'TRANSIT',
                'vehicle_type' => $vehicle['type'] ?? 'TRANSIT',
                'vehicle_name' => data_get($vehicle, 'name.text'),
                'line_name' => $line['nameShort'] ?? ($line['name'] ?? null),
                'line_color' => $line['color'] ?? null,
                'line_text_color' => $line['textColor'] ?? null,
                'headsign' => $details['headsign'] ?? null,
                'departure_stop' => data_get($details, 'stopDetails.departureStop.name'),
                'departure_at' => data_get($details, 'stopDetails.departureTime'),
                'arrival_stop' => data_get($details, 'stopDetails.arrivalStop.name'),
                'arrival_at' => data_get($details, 'stopDetails.arrivalTime'),
                'stop_count' => isset($details['stopCount']) ? (int) $details['stopCount'] : null,
            ];
        }

        $flushWalking();

        return $result;
    }

    private function seconds(?string $duration): int
    {
        return (int) round((float) rtrim((string) $duration, 's'));
    }
}
