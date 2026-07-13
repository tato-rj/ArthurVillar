<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Recital;
use App\Models\Student;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RecitalsController extends Controller
{
    public function index()
    {
        $venues = Venue::query()->orderBy('name')->get();
        $students = Student::query()->orderBy('first_name')->orderBy('last_name')->get();

        return view('studio.recitals.index', compact('venues', 'students'));
    }

    public function store(Request $request)
    {
        Recital::create($this->validatedRecital($request));

        return back()->with('success', 'The recital was successfully added');
    }

    public function edit(Recital $recital)
    {
        $venues = Venue::query()->orderBy('name')->get();

        return view('studio.recitals.edit', compact('recital', 'venues'));
    }

    public function update(Request $request, Recital $recital)
    {
        $recital->update($this->validatedRecital($request, $recital));

        return back()->with('success', 'The recital was successfully updated');
    }

    public function updateStudents(Request $request, Recital $recital)
    {
        $data = $request->validate([
            'student_ids' => ['nullable', 'array'],
            'student_ids.*' => ['integer', Rule::exists('students', 'id')],
        ]);

        $recital->students()->sync($data['student_ids'] ?? []);

        return back()->with('success', 'The recital participants were successfully updated');
    }

    public function destroy(Recital $recital)
    {
        $recital->delete();

        return back()->with('success', 'The recital was successfully deleted');
    }

    private function validatedRecital(Request $request, Recital $recital = null)
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'venue_id' => ['nullable', 'integer', Rule::exists('venues', 'id')],
        ]);
    }
}
