<?php

namespace App\Http\Controllers\Studio;

use App\Calendar\Scheduler;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudioController extends Controller
{
    public function index(Request $request, Scheduler $scheduler)
    {
        ['plannedLessons' => $plannedLessons, 'holidays' => $holidays, 'calendarRange' => $calendarRange] = $scheduler->payload($request);

        if ($request->boolean('lesson_plans')) {
            return response()->json([
                'plannedLessons' => $plannedLessons,
                'holidays' => $holidays,
                'calendarRange' => $calendarRange,
            ]);
        }

        return view('studio.index', compact('plannedLessons', 'holidays', 'calendarRange'));
    }
}
