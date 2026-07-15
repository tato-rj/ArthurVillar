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
        $showCalendarInsights = Settings::getValue('calendar.show_insights', true);
        $showHolidays = Settings::getValue('calendar.show_holidays', true);
        $defaultDesktopCalendarView = Settings::getValue('calendar.default_desktop_view', 'week');
        $defaultMobileCalendarView = Settings::getValue('calendar.default_mobile_view', '2-days');
        $unconfirmedLessonColor = Settings::getValue('appearance.unconfirmed_lesson_color', '#6b7280');
        $unpaidLessonColor = Settings::getValue('appearance.unpaid_lesson_color', '#ff4b4b');
        $paidLessonColor = Settings::getValue('appearance.paid_lesson_color', '#58cc02');
        $canceledLessonColor = Settings::getValue('appearance.canceled_lesson_color', '#ffffff');
        $generalEventColor = Settings::getValue('appearance.general_event_color', '#ce82ff');
        $showCancelledLessons = Settings::getValue('calendar.show_cancelled', false);
        $addTransparencyToPastEvents = Settings::getValue('calendar.add_transparency_to_past_events', true);
        $highlightConflictingEvents = Settings::getValue('calendar.highlight_conflicting_events', true);
        $defaultEventNotificationMinutesBefore = Settings::getValue('notifications.default_event_minutes_before', -1);

        return view('studio.index', compact('plannedLessons', 'singleLessonPlans', 'holidays', 'teachingBreaks', 'recitals', 'generalEvents', 'calendarRange', 'locations', 'birthdayWindow', 'showCalendarInsights', 'showHolidays', 'defaultDesktopCalendarView', 'defaultMobileCalendarView', 'unconfirmedLessonColor', 'unpaidLessonColor', 'paidLessonColor', 'canceledLessonColor', 'generalEventColor', 'showCancelledLessons', 'addTransparencyToPastEvents', 'highlightConflictingEvents', 'defaultEventNotificationMinutesBefore'));
    }
}
