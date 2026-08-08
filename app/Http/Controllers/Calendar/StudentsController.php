<?php

namespace App\Http\Controllers\Calendar;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Calendar\{Location, Student, WaitingList};
use Illuminate\Validation\Rule;

class StudentsController extends Controller
{
    public function index()
    {
        return view('calendar.students.index', [
            'studentsGrandTotal' => Student::query()->count(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validateStudent($request);

        Student::create($this->studentAttributes($data));

        if (! empty($data['waiting_list_id'])) {
            WaitingList::whereKey($data['waiting_list_id'])->delete();
        }

        return back()->with('success', 'The student was successfully added');
    }

    public function update(Request $request, Student $student)
    {
        $student->update($this->studentAttributes($this->validateStudent($request)));

        return back()->with('success', 'The student was successfully updated');
    }

    public function edit(Student $student)
    {
        return view('calendar.students.edit', compact('student'));
    }

    public function show(Student $student)
    {
        $today = today()->startOfDay();
        $missedLessonPlan = $student->currentLessonPlan();
        $missedDates = $missedLessonPlan
            ? $missedLessonPlan->missedLessonDates($today)
            : collect();

        $registeredLessonPlans = $student->lessonPlans()
            ->with('location')
            ->whereNull('canceled_at')
            ->get()
            ->filter(fn ($lessonPlan) => $lessonPlan->isCurrent())
            ->values();

        $registeredSingleLessons = $student->singleLessonPlans()
            ->with('location')
            ->where('status', 'active')
            ->whereDate('scheduled_date', '>=', $today->toDateString())
            ->orderBy('scheduled_date')
            ->orderBy('start_time')
            ->get();

        $confirmedLessons = $student->lessons()
            ->with('lessonPlan')
            ->whereNull('canceled_at')
            ->whereNotNull('paid_at')
            ->latest('starts_at')
            ->get()
            ->sortByDesc(fn ($lesson) => ($lesson->scheduled_date ?: $lesson->starts_at)->timestamp)
            ->values();

        $unpaidLessons = $student->lessons()
            ->with('lessonPlan')
            ->whereNull('canceled_at')
            ->whereNull('paid_at')
            ->latest('starts_at')
            ->get()
            ->sortByDesc(fn ($lesson) => ($lesson->scheduled_date ?: $lesson->starts_at)->timestamp)
            ->values();

        return view('calendar.students.show', compact(
            'student',
            'missedLessonPlan',
            'missedDates',
            'registeredLessonPlans',
            'registeredSingleLessons',
            'confirmedLessons',
            'unpaidLessons'
        ));
    }

    private function validateStudent(Request $request)
    {
        return $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(['male', 'female'])],
            'parent_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date_format:m/d/Y'],
            'location_id' => [
                'nullable',
                Rule::exists('locations', 'id')->where('usage', Location::USAGE_TEACHING),
            ],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'is_adult' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string'],
            'waiting_list_id' => ['nullable', 'exists:waiting_lists,id'],
        ]);
    }

    private function studentAttributes(array $data)
    {
        return [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'gender' => $data['gender'],
            'parent_name' => $data['parent_name'] ?? null,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'location_id' => $data['location_id'] ?? null,
            'payment_method' => $data['payment_method'] ?? null,
            'is_adult' => $data['is_adult'] ?? false,
            'notes' => $data['notes'] ?? null,
            'date_of_birth' => ! empty($data['date_of_birth'])
                ? Carbon::createFromFormat('m/d/Y', $data['date_of_birth'])->format('Y-m-d')
                : null,
        ];
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return back()->with('success', 'The student was successfully deleted');
    }
}
