<?php

namespace App\Http\Controllers\Calendar;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Calendar\{Location, Student, WaitingList};
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StudentsController extends Controller
{
    public function index()
    {
        $selectedLocations = collect(explode(',', request('student_locations', 'home,online,bkcm')))
            ->intersect(['home', 'online', 'bkcm'])
            ->values();
        $showArchivedStudents = request('student_archived') === 'archived';
        $studentsInitialTotal = $selectedLocations->isEmpty()
            ? 0
            : Student::query()
                ->when($showArchivedStudents, fn ($query) => $query->archived())
                ->unless($showArchivedStudents, fn ($query) => $query->whereNull('students.archived_at'))
                ->whereHas('location', function ($query) use ($selectedLocations) {
                    $query->whereIn(DB::raw('LOWER(name)'), $selectedLocations);
                })
                ->count();

        return view('calendar.students.index', [
            'studentsInitialTotal' => $studentsInitialTotal,
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
        $recurringLessonPlans = $student->lessonPlans()
            ->with('location')
            // ->whereNull('canceled_at')
            ->get();
            // ->filter(fn ($lessonPlan) => $lessonPlan->isCurrent())
            // ->values();

        $singleLessonsPlans = $student->singleLessonPlans()
            ->with('location')
            // ->whereDate('scheduled_date', '>=', $today->toDateString())
            ->orderBy('scheduled_date')
            ->orderBy('start_time')
            ->get();

        return view('calendar.students.show', compact(
            'student',
            'recurringLessonPlans',
            'singleLessonsPlans'
        ));
    }

    public function lessonPlans(Student $student)
    {
        $plans = $student->lessonPlans()->with('location')->get()->map(function ($plan) {
            return ['plan' => $plan, 'single' => false,
                'current' => ! $plan->canceled_at && $plan->isCurrent(),
                'date' => optional($plan->starts_on)->format('Y-m-d') ?? ''];
        })->concat($student->singleLessonPlans()->with('location')->get()->map(function ($plan) {
            return ['plan' => $plan, 'single' => true,
                'current' => $plan->scheduled_date && $plan->scheduled_date->isToday(),
                'date' => optional($plan->scheduled_date)->format('Y-m-d') ?? ''];
        }))->sort(function ($a, $b) {
            return ($b['current'] <=> $a['current'])
                ?: strcmp($b['date'], $a['date'])
                ?: ($b['plan']->id <=> $a['plan']->id);
        })->values();

        return view('calendar.students.mobile-plans', compact('student', 'plans'));
    }

    public function archive(Student $student)
    {
        $student->archive();

        return back()->with('success', 'The student was successfully archived');
    }

    public function unarchive(Student $student)
    {
        $student->unarchive();

        return back()->with('success', 'The student was successfully unarchived');
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
            'payment_exempt' => ['nullable', 'boolean'],
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
            'payment_exempt' => $data['payment_exempt'] ?? false,
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
