<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'calendar_show_cancelled' => ['required', 'boolean'],
            'calendar_add_transparency_to_past_events' => ['required', 'boolean'],
            'calendar_highlight_conflicting_events' => ['required', 'boolean'],
        ]);

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

        return back()->with('success', 'Settings updated');
    }
}
