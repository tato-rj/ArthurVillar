<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SettingsController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'calendar_show_insights' => ['required', 'boolean'],
            'unconfirmed_lesson_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'calendar_show_cancelled' => ['required', 'boolean'],
            'calendar_add_transparency_to_past_events' => ['required', 'boolean'],
            'calendar_highlight_conflicting_events' => ['required', 'boolean'],
            'default_event_notification_minutes_before' => ['required', 'integer', Rule::in(array_merge([-1], array_keys(Event::notificationOptions())))],
        ]);

        Settings::setValue(
            'calendar.show_insights',
            $request->boolean('calendar_show_insights'),
            Settings::TYPE_BOOLEAN
        );

        Settings::setValue(
            'appearance.unconfirmed_lesson_color',
            strtolower($request->input('unconfirmed_lesson_color')),
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

        return back()->with('success', 'Settings updated');
    }
}
