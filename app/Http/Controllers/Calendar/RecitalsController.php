<?php

namespace App\Http\Controllers\Calendar;

use App\Calendar\Scheduler;
use App\Http\Controllers\Controller;
use App\Models\Calendar\{Event, Location, Recital, Student};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class RecitalsController extends Controller
{
    public function index()
    {
        $locations = Location::query()
            ->recital()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
        $students = Student::query()->whereNull('archived_at')->orderBy('first_name')->orderBy('last_name')->get();

        return view('calendar.recitals.index', compact('locations', 'students'));
    }

    public function store(Request $request)
    {
        Recital::create($this->validatedRecital($request));

        return back()->with('success', 'The recital was successfully added');
    }

    public function edit(Recital $recital)
    {
        $locations = Location::query()
            ->recital()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return view('calendar.recitals.edit', compact('recital', 'locations'));
    }

    public function update(Request $request, Recital $recital)
    {
        $recital->update($this->validatedRecital($request));

        return back()->with('success', 'The recital was successfully updated');
    }

    public function updateStudents(Request $request, Recital $recital)
    {
        $data = $request->validate([
            'student_ids' => ['nullable', 'array'],
            'student_ids.*' => ['integer', Rule::exists('students', 'id')],
        ]);

        DB::transaction(function () use ($recital, $data) {
            $lockedRecital = Recital::lockForUpdate()->findOrFail($recital->id);
            $lockedRecital->students()->sync($data['student_ids'] ?? []);
        });

        return back()->with('success', 'The recital participants were successfully updated');
    }

    public function upcomingForStudent(Student $student)
    {
        $recitals = Recital::upcoming()
            ->with('location:id,name')
            ->withExists(['students as joined' => fn ($query) => $query->whereKey($student->id)])
            ->inScheduleOrder()
            ->get()
            ->map(fn (Recital $recital) => [
                'id' => $recital->id,
                'name' => $recital->name,
                'date' => $recital->date->toDateString(),
                'start_time' => $recital->start_time,
                'location_name' => $recital->location?->name,
                'joined' => $recital->joined,
            ]);

        return response()->json(['recitals' => $recitals]);
    }

    public function joinUpcoming(Request $request, Student $student, Scheduler $scheduler)
    {
        $data = $request->validate([
            'recital_ids' => ['required', 'array', 'min:1'],
            'recital_ids.*' => ['required', 'integer', 'distinct'],
        ]);

        $payload = DB::transaction(function () use ($data, $student, $scheduler) {
            $recitalIds = Recital::upcoming()->whereKey($data['recital_ids'])
                ->orderBy('id')->lockForUpdate()->pluck('id');

            if ($recitalIds->count() !== count($data['recital_ids'])) {
                throw ValidationException::withMessages([
                    'recital_ids' => 'One or more selected recitals are no longer upcoming.',
                ]);
            }

            $student->recitals()->syncWithoutDetaching($recitalIds->all());

            return [
                'recital_ids' => $recitalIds,
                'student' => ['id' => $student->id, 'name' => $student->full_name],
                'next_recital' => $scheduler->nextRecitalsByStudent([$student->id])->get($student->id),
            ];
        });

        return response()->json($payload);
    }

    public function destroy(Recital $recital)
    {
        $recital->delete();

        return back()->with('success', 'The recital was successfully deleted');
    }

    private function validatedRecital(Request $request)
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'start_time' => ['nullable', 'date_format:H:i', Rule::in(Event::timeOptions())],
            'location_id' => [
                'nullable',
                'integer',
                Rule::exists('locations', 'id')->where('usage', Location::USAGE_RECITAL),
            ],
        ]);
    }
}
