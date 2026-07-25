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

        if ($route && isset($origin['ends_at'])) {
            $gapSeconds = max(0, $eventStartsAt->timestamp - $origin['ends_at']->timestamp);
            $longGapMultiplier = max(
                1,
                (float) config('calendar.google_routes.long_gap_multiplier', 2)
            );

            if ($gapSeconds >= $route->duration_seconds * $longGapMultiplier) {
                return response()->noContent();
            }
        }

        return $route
            ? response()->json(['route' => $travelRoutes->payload($route)])
            : response()->noContent();
    }
}
