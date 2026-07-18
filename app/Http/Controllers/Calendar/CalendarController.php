<?php

namespace App\Http\Controllers\Calendar;

use App\Calendar\Scheduler;
use App\Http\Controllers\Controller;
use App\Models\Calendar\{Location, Student};
use Illuminate\Http\Request;

class CalendarController extends Controller
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

        return view('calendar.index', compact('plannedLessons', 'singleLessonPlans', 'holidays', 'teachingBreaks', 'recitals', 'generalEvents', 'calendarRange', 'locations', 'birthdayWindow'));
    }
}
