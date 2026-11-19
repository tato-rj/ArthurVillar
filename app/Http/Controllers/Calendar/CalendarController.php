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
        $payload = $scheduler->payload($request);

        if ($request->boolean('lesson_plans')) {
            return response()->json($payload);
        }

        $locations = Location::query()
            ->teaching()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
        $homeLocation = Location::query()
            ->whereRaw('LOWER(name) = ?', ['home'])
            ->first();
        $birthdayWindow = Student::birthdayWindow();

        return view('calendar.index', $payload + compact('locations', 'homeLocation', 'birthdayWindow'));
    }
}
