<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventsController extends Controller
{
    public function index()
    {
        return view('studio.events.index');
    }

    public function store(Request $request)
    {
        Event::create($this->validatedEvent($request));

        return back()->with('success', 'The event was successfully added');
    }

    public function edit(Event $event)
    {
        return view('studio.events.edit', compact('event'));
    }

    public function update(Request $request, Event $event)
    {
        $event->update($this->validatedEvent($request));

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
        ]));

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
        $event->delete();

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'The event was successfully canceled',
                'event_id' => $event->id,
            ]);
        }

        return back()->with('success', 'The event was successfully deleted');
    }

    private function validatedEvent(Request $request)
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'scheduled_date' => ['required', 'date'],
            'starts_at' => ['required', 'date_format:H:i', Rule::in(Event::timeOptions())],
            'ends_at' => ['required', 'date_format:H:i', Rule::in(Event::timeOptions()), 'after:starts_at'],
            'notes' => ['nullable', 'string'],
        ]);
    }
}
