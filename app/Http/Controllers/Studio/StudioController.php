<?php

namespace App\Http\Controllers\Studio;

use App\Calendar\Scheduler;
use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Settings;
use App\Models\Student;
use Illuminate\Http\Request;

class StudioController extends Controller
{
    public function index(Request $request, Scheduler $scheduler)
    {
        [
            'plannedLessons' => $plannedLessons,
            'singleLessonPlans' => $singleLessonPlans,
            'holidays' => $holidays,
            'teachingBreaks' => $teachingBreaks,
            'recitals' => $recitals,
            'generalEvents' => $generalEvents,
            'calendarRange' => $calendarRange,
        ] = $scheduler->payload($request);

        if ($request->boolean('lesson_plans')) {
            return response()->json([
                'plannedLessons' => $plannedLessons,
                'singleLessonPlans' => $singleLessonPlans,
                'holidays' => $holidays,
                'teachingBreaks' => $teachingBreaks,
                'recitals' => $recitals,
                'generalEvents' => $generalEvents,
                'calendarRange' => $calendarRange,
            ]);
        }

        $locations = Location::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
        $birthdayWindow = Student::birthdayWindow();
        $showCancelledLessons = Settings::getValue('calendar.show_cancelled', false);
        $addTransparencyToPastEvents = Settings::getValue('calendar.add_transparency_to_past_events', true);
        $highlightConflictingEvents = Settings::getValue('calendar.highlight_conflicting_events', true);

        return view('studio.index', compact('plannedLessons', 'singleLessonPlans', 'holidays', 'teachingBreaks', 'recitals', 'generalEvents', 'calendarRange', 'locations', 'birthdayWindow', 'showCancelledLessons', 'addTransparencyToPastEvents', 'highlightConflictingEvents'));
    }
}
