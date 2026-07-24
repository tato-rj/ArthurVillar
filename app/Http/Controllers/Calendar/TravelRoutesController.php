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

        $origin = $originFinder->before($arrivalAt, $request->user()->id);

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
            ? response()->json(['route' => $travelRoutes->payload($route)])
            : response()->noContent();
    }
}
