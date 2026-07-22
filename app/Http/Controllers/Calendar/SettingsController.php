<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\{Event, GoogleCalendarConnection, GoogleCalendarEvent, Settings};
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SettingsController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'calendar_show_insights' => ['required', 'boolean'],
            'calendar_show_holidays' => ['required', 'boolean'],
            'calendar_default_desktop_view' => ['required', Rule::in(['schedule', 'day', '2-days', 'week', 'month'])],
            'calendar_default_mobile_view' => ['required', Rule::in(['schedule', 'day', '2-days', 'week', 'month'])],
            'unconfirmed_lesson_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'unpaid_lesson_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'paid_lesson_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'canceled_lesson_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'general_event_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'calendar_show_cancelled' => ['required', 'boolean'],
            'calendar_add_transparency_to_past_events' => ['required', 'boolean'],
            'calendar_highlight_conflicting_events' => ['required', 'boolean'],
            'default_event_notification_minutes_before' => ['required', 'integer', Rule::in(array_merge([-1], array_keys(Event::notificationOptions())))],
            'google_recurring_sync_months' => ['required', 'integer', Rule::in(GoogleCalendarEvent::RECURRING_SYNC_MONTH_OPTIONS)],
        ]);

        $previousGoogleRecurringSyncMonths = GoogleCalendarEvent::recurringSyncMonths();

        Settings::setValue(
            'calendar.show_insights',
            $request->boolean('calendar_show_insights'),
            Settings::TYPE_BOOLEAN
        );

        Settings::setValue(
            'calendar.show_holidays',
            $request->boolean('calendar_show_holidays'),
            Settings::TYPE_BOOLEAN
        );

        Settings::setValue(
            'calendar.default_desktop_view',
            $request->input('calendar_default_desktop_view'),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'calendar.default_mobile_view',
            $request->input('calendar_default_mobile_view'),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'appearance.unconfirmed_lesson_color',
            strtolower($request->input('unconfirmed_lesson_color')),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'appearance.unpaid_lesson_color',
            strtolower($request->input('unpaid_lesson_color')),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'appearance.paid_lesson_color',
            strtolower($request->input('paid_lesson_color')),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'appearance.canceled_lesson_color',
            strtolower($request->input('canceled_lesson_color')),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'appearance.general_event_color',
            strtolower($request->input('general_event_color')),
            Settings::TYPE_STRING
        );

        Settings::setValue(
            'calendar.show_cancelled',
            $request->boolean('calendar_show_cancelled'),
            Settings::TYPE_BOOLEAN
        );

        Settings::setValue(
            'calendar.add_transparency_to_past_events',
            $request->boolean('calendar_add_transparency_to_past_events'),
            Settings::TYPE_BOOLEAN
        );

        Settings::setValue(
            'calendar.highlight_conflicting_events',
            $request->boolean('calendar_highlight_conflicting_events'),
            Settings::TYPE_BOOLEAN
        );

        Settings::setValue(
            'notifications.default_event_minutes_before',
            (int) $request->input('default_event_notification_minutes_before'),
            Settings::TYPE_INTEGER
        );

        $googleRecurringSyncMonths = (int) $request->input('google_recurring_sync_months');

        Settings::setValue(
            'google_calendar.recurring_sync_months',
            $googleRecurringSyncMonths,
            Settings::TYPE_INTEGER
        );

        if ($googleRecurringSyncMonths !== $previousGoogleRecurringSyncMonths) {
            GoogleCalendarConnection::query()
                ->where('user_id', $request->user()->id)
                ->update(['sync_token' => null]);

            GoogleCalendarEvent::query()
                ->whereHas('calendarConnection', function ($connection) use ($request) {
                    $connection->where('user_id', $request->user()->id);
                })
                ->beyondRecurringSyncHorizon()
                ->delete();
        }

        return back()->with('success', 'Settings updated');
    }
}
