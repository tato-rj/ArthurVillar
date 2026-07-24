<?php

namespace App\Services;

use App\Models\Calendar\TravelRoute;
use Carbon\CarbonImmutable;

class CalendarTravelRoutes
{
    public function __construct(private GoogleRoutesClient $client)
    {
    }

    public function forEvent(
        int $userId,
        string $eventKey,
        array $origin,
        string $destinationAddress,
        string $destinationLabel,
        CarbonImmutable $arrivalAt,
        bool $force = false
    ): ?TravelRoute {
        if (! $this->client->isConfigured() || empty($origin['address'])) {
            return null;
        }

        $signature = hash('sha256', implode('|', [
            $origin['address'],
            $destinationAddress,
            $arrivalAt->utc()->toIso8601String(),
        ]));
        $cached = TravelRoute::query()
            ->where('user_id', $userId)
            ->where('event_key', $eventKey)
            ->first();

        if (! $force && $cached && $cached->request_signature === $signature && $this->isFresh($cached, $arrivalAt)) {
            return $cached;
        }

        if ($this->samePlace($origin['address'], $destinationAddress)) {
            $route = [
                'travel_mode' => 'WALK',
                'duration_seconds' => 0,
                'distance_meters' => 0,
                'departure_at' => $arrivalAt,
                'arrival_at' => $arrivalAt,
                'steps' => [],
            ];
        } else {
            $route = $this->client->calculate($origin['address'], $destinationAddress, $arrivalAt);
        }

        if (! $route) {
            return $cached && $cached->request_signature === $signature ? $cached : null;
        }

        return TravelRoute::updateOrCreate([
            'user_id' => $userId,
            'event_key' => $eventKey,
        ], [
            'origin_address' => $origin['address'],
            'origin_label' => $origin['label'] ?? null,
            'destination_address' => $destinationAddress,
            'destination_label' => $destinationLabel,
            'request_signature' => $signature,
            'travel_mode' => $route['travel_mode'],
            'duration_seconds' => $route['duration_seconds'],
            'distance_meters' => $route['distance_meters'],
            'departure_at' => $route['departure_at']->utc(),
            'arrival_at' => $route['arrival_at']->utc(),
            'steps' => $route['steps'],
            'refreshed_at' => now(),
        ]);
    }

    public function refresh(TravelRoute $travelRoute): ?TravelRoute
    {
        return $this->forEvent(
            $travelRoute->user_id,
            $travelRoute->event_key,
            ['address' => $travelRoute->origin_address, 'label' => $travelRoute->origin_label],
            $travelRoute->destination_address,
            $travelRoute->destination_label ?: $travelRoute->destination_address,
            CarbonImmutable::instance($travelRoute->arrival_at),
            true
        );
    }

    public function payload(TravelRoute $travelRoute): array
    {
        return [
            'mode' => $travelRoute->travel_mode,
            'duration_seconds' => $travelRoute->duration_seconds,
            'distance_meters' => $travelRoute->distance_meters,
            'departure_at' => $travelRoute->departure_at?->toIso8601String(),
            'arrival_at' => $travelRoute->arrival_at?->toIso8601String(),
            'origin' => $travelRoute->origin_label ?: $travelRoute->origin_address,
            'destination' => $travelRoute->destination_label ?: $travelRoute->destination_address,
            'steps' => $travelRoute->steps ?: [],
            'refreshed_at' => $travelRoute->refreshed_at?->toIso8601String(),
        ];
    }

    private function isFresh(TravelRoute $travelRoute, CarbonImmutable $arrivalAt): bool
    {
        $minutesUntilArrival = now(config('calendar.timezone'))->diffInMinutes($arrivalAt, false);
        $freshMinutes = $minutesUntilArrival <= (int) config('calendar.google_routes.approaching_window_minutes', 120)
            ? (int) config('calendar.google_routes.approaching_refresh_minutes', 10)
            : (int) config('calendar.google_routes.cache_minutes', 1440);

        return $travelRoute->refreshed_at
            && $travelRoute->refreshed_at->gte(now()->subMinutes($freshMinutes));
    }

    private function samePlace(string $origin, string $destination): bool
    {
        $normalize = fn ($value) => preg_replace('/[^a-z0-9]/', '', strtolower($value));

        return $normalize($origin) === $normalize($destination);
    }
}
