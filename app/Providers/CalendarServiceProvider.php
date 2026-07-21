<?php

namespace App\Providers;

use App\Models\Calendar\Settings;
use App\Models\Calendar\GoogleCalendarConnection;
use App\Services\GoogleCalendarClient;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class CalendarServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('calendar.index', function ($view) {
            $defaults = [
                'calendar.show_insights' => true,
                'calendar.show_holidays' => true,
                'calendar.default_desktop_view' => 'week',
                'calendar.default_mobile_view' => '2-days',
                'appearance.unconfirmed_lesson_color' => '#6b7280',
                'appearance.unpaid_lesson_color' => '#ff4b4b',
                'appearance.paid_lesson_color' => '#58cc02',
                'appearance.canceled_lesson_color' => '#ffffff',
                'appearance.general_event_color' => '#ce82ff',
                'calendar.show_cancelled' => false,
                'calendar.add_transparency_to_past_events' => true,
                'calendar.highlight_conflicting_events' => true,
                'notifications.default_event_minutes_before' => -1,
            ];

            $storedSettings = Settings::query()
                ->whereIn('key', array_keys($defaults))
                ->get()
                ->keyBy('key');

            $value = function (string $key) use ($defaults, $storedSettings) {
                return $storedSettings->has($key)
                    ? $storedSettings->get($key)->typedValue()
                    : $defaults[$key];
            };

            $calendarViewOptions = [
                'schedule' => 'Schedule',
                'day' => 'Day',
                '2-days' => '2 Days',
                'week' => 'Week',
                'month' => 'Month',
            ];

            $unconfirmedLessonColor = $value('appearance.unconfirmed_lesson_color');
            $unpaidLessonColor = $value('appearance.unpaid_lesson_color');
            $paidLessonColor = $value('appearance.paid_lesson_color');
            $canceledLessonColor = $value('appearance.canceled_lesson_color');
            $generalEventColor = $value('appearance.general_event_color');
            $googleCalendarConnections = auth()->check()
                ? GoogleCalendarConnection::query()
                    ->where('user_id', auth()->id())
                    ->orderBy('calendar_name')
                    ->get()
                : collect();

            $view->with([
                'showCalendarInsights' => $value('calendar.show_insights'),
                'showHolidays' => $value('calendar.show_holidays'),
                'defaultDesktopCalendarView' => $value('calendar.default_desktop_view'),
                'defaultMobileCalendarView' => $value('calendar.default_mobile_view'),
                'selectedDesktopCalendarView' => old('calendar_default_desktop_view', $value('calendar.default_desktop_view')),
                'selectedMobileCalendarView' => old('calendar_default_mobile_view', $value('calendar.default_mobile_view')),
                'calendarViewOptions' => $calendarViewOptions,
                'unconfirmedLessonColor' => $unconfirmedLessonColor,
                'unpaidLessonColor' => $unpaidLessonColor,
                'paidLessonColor' => $paidLessonColor,
                'canceledLessonColor' => $canceledLessonColor,
                'generalEventColor' => $generalEventColor,
                'appearanceSettings' => [
                    ['id' => 'unconfirmed-lesson-color', 'name' => 'unconfirmed_lesson_color', 'label' => 'Unconfirmed lessons', 'value' => old('unconfirmed_lesson_color', $unconfirmedLessonColor), 'default' => '#6b7280'],
                    ['id' => 'unpaid-lesson-color', 'name' => 'unpaid_lesson_color', 'label' => 'Unpaid lessons', 'value' => old('unpaid_lesson_color', $unpaidLessonColor), 'default' => '#ff4b4b'],
                    ['id' => 'paid-lesson-color', 'name' => 'paid_lesson_color', 'label' => 'Paid lessons', 'value' => old('paid_lesson_color', $paidLessonColor), 'default' => '#58cc02'],
                    ['id' => 'canceled-lesson-color', 'name' => 'canceled_lesson_color', 'label' => 'Canceled lessons', 'value' => old('canceled_lesson_color', $canceledLessonColor), 'default' => '#ffffff'],
                    ['id' => 'general-event-color', 'name' => 'general_event_color', 'label' => 'General events', 'value' => old('general_event_color', $generalEventColor), 'default' => '#ce82ff'],
                ],
                'showCancelledLessons' => $value('calendar.show_cancelled'),
                'addTransparencyToPastEvents' => $value('calendar.add_transparency_to_past_events'),
                'highlightConflictingEvents' => $value('calendar.highlight_conflicting_events'),
                'defaultEventNotificationMinutesBefore' => $value('notifications.default_event_minutes_before'),
                'selectedNotificationPreference' => (int) old('default_event_notification_minutes_before', $value('notifications.default_event_minutes_before')),
                'googleCalendarConfigured' => app(GoogleCalendarClient::class)->isConfigured(),
                'googleCalendarConnections' => $googleCalendarConnections,
            ]);
        });
    }
}
