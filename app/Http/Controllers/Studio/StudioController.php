<?php

namespace App\Http\Controllers\Studio;

use App\Calendar\Scheduler;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudioController extends Controller
{
    public function index(Request $request, Scheduler $scheduler)
    {
        [
            'plannedLessons' => $plannedLessons,
            'singleLessonPlans' => $singleLessonPlans,
            'holidays' => $holidays,
            'teachingBreaks' => $teachingBreaks,
            'calendarRange' => $calendarRange,
        ] = $scheduler->payload($request);

        if ($request->boolean('lesson_plans')) {
            return response()->json([
                'plannedLessons' => $plannedLessons,
                'singleLessonPlans' => $singleLessonPlans,
                'holidays' => $holidays,
                'teachingBreaks' => $teachingBreaks,
                'calendarRange' => $calendarRange,
            ]);
        }

        $locations = Location::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return view('studio.index', compact('plannedLessons', 'singleLessonPlans', 'holidays', 'teachingBreaks', 'calendarRange', 'locations'));
    }
}
