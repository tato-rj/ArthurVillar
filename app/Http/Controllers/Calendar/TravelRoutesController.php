<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Services\CalendarTravelOrigin;
use App\Services\CalendarTravelRoutes;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;

class TravelRoutesController extends Controller
{
    public function show(
        Request $request,
        CalendarTravelOrigin $originFinder,
        CalendarTravelRoutes $travelRoutes
    ) {
        $data = $request->validate([
            'event_key' => ['required', 'string', 'max:255'],
            'arrival_at' => ['required', 'date'],
            'destination_address' => ['required', 'string', 'max:1000'],
            'destination_label' => ['required', 'string', 'max:255'],
        ]);
        $arrivalAt = CarbonImmutable::parse($data['arrival_at'], config('calendar.timezone'));
        $now = CarbonImmutable::now(config('calendar.timezone'));

        if ($arrivalAt->lte($now) || $arrivalAt->gt($now->addDays(100))) {
            return response()->noContent();
        }

        $eventStartsAt = $arrivalAt->addMinutes(
            (int) config('calendar.google_routes.arrival_buffer_minutes', 5)
        );
        $origin = $originFinder->before($eventStartsAt, $request->user()->id);

        if (! $origin) {
            return response()->noContent();
        }

        $route = $travelRoutes->forEvent(
            $request->user()->id,
            $data['event_key'],
            $origin,
            $data['destination_address'],
            $data['destination_label'],
            $arrivalAt
        );

        return $route
            ? response()->json(['route' => array_merge(
                $travelRoutes->payload($route),
                [
                    'origin_ends_at' => isset($origin['ends_at']) ? $origin['ends_at']->toIso8601String() : null,
                    'origin_is_home' => (bool) ($origin['is_home'] ?? false),
                ]
            )])
            : response()->noContent();
    }

    public function returnHome(
        Request $request,
        CalendarTravelOrigin $originFinder,
        CalendarTravelRoutes $travelRoutes
    ) {
        $data = $request->validate([
            'event_key' => ['required', 'string', 'max:255'],
            'departure_at' => ['required', 'date'],
            'origin_address' => ['required', 'string', 'max:1000'],
            'origin_label' => ['required', 'string', 'max:255'],
        ]);
        $departureAt = CarbonImmutable::parse($data['departure_at'], config('calendar.timezone'));
        $now = CarbonImmutable::now(config('calendar.timezone'));
        $home = $originFinder->home();

        if (! $home || $departureAt->lte($now) || $departureAt->gt($now->addDays(100))) {
            return response()->noContent();
        }

        $route = $travelRoutes->forEvent(
            $request->user()->id,
            'return-home:'.$data['event_key'],
            [
                'address' => $data['origin_address'],
                'label' => $data['origin_label'],
            ],
            $home['address'],
            $home['label'] ?? 'Home',
            $departureAt,
            false,
            'departure'
        );

        return $route
            ? response()->json(['route' => array_merge(
                $travelRoutes->payload($route),
                [
                    'origin_ends_at' => $departureAt->toIso8601String(),
                    'origin_is_home' => false,
                    'return_home' => true,
                ]
            )])
            : response()->noContent();
    }
}
