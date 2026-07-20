<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\Event;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventsController extends Controller
{
    public function index()
    {
        return view('calendar.events.index');
    }

    public function canceled()
    {
        return view('calendar.events.canceled');
    }

    public function store(Request $request)
    {
        Event::create($this->eventAttributes($request));

        return back()->with('success', 'The event was successfully added');
    }

    public function edit(Event $event)
    {
        return view('calendar.events.edit', compact('event'));
    }

    public function update(Request $request, Event $event)
    {
        $event->update($this->eventAttributes($request));

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'The event was successfully updated',
                'event' => $event->fresh()->calendarPayload(),
            ]);
        }

        return back()->with('success', 'The event was successfully updated');
    }

    public function reschedule(Request $request, Event $event)
    {
        $event->update($request->validate([
            'scheduled_date' => ['required', 'date'],
            'starts_at' => ['required', 'date_format:H:i', Rule::in(Event::timeOptions())],
            'ends_at' => ['required', 'date_format:H:i', Rule::in(Event::timeOptions()), 'after:starts_at'],
        ]) + ['notification_sent_at' => null]);

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'The event was successfully rescheduled',
                'event' => $event->fresh()->calendarPayload(),
            ]);
        }

        return back()->with('success', 'The event was successfully rescheduled');
    }

    public function destroy(Request $request, Event $event)
    {
        $event->update([
            'canceled_at' => now(),
            'notification_sent_at' => null,
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'The event was successfully canceled',
                'event_id' => $event->id,
            ]);
        }

        return back()->with('success', 'The event was successfully canceled');
    }

    public function revert(Request $request, Event $event)
    {
        $event->update(['canceled_at' => null]);

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'The event cancellation was successfully reverted',
                'event' => $event->fresh()->calendarPayload(),
            ]);
        }

        return back()->with('success', 'The event cancellation was successfully reverted');
    }

    private function eventAttributes(Request $request): array
    {
        $attributes = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'scheduled_date' => ['required', 'date'],
            'starts_at' => ['required', 'date_format:H:i', Rule::in(Event::timeOptions())],
            'ends_at' => ['required', 'date_format:H:i', Rule::in(Event::timeOptions()), 'after:starts_at'],
            'type' => ['nullable', Rule::in(array_values(Event::typeOptions()))],
            'notes' => ['nullable', 'string'],
            'send_notification' => ['nullable', 'boolean'],
            'notification_minutes_before' => [
                Rule::requiredIf($request->boolean('send_notification')),
                'nullable',
                'integer',
                Rule::in(array_keys(Event::notificationOptions())),
            ],
        ]);

        unset($attributes['send_notification']);

        if ($request->boolean('send_notification')) {
            $attributes['notification_user_id'] = $request->user()->id;
            $attributes['notification_sent_at'] = null;
        } else {
            $attributes['notification_user_id'] = null;
            $attributes['notification_minutes_before'] = null;
            $attributes['notification_sent_at'] = null;
        }

        return $attributes;
    }
}
