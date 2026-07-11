<?php

namespace App\Http\Controllers\Studio;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{Student, WaitingList};
use Illuminate\Validation\Rule;

class StudentsController extends Controller
{
    public function index()
    {
        return view('studio.students.index');
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
        return view('studio.students.edit', compact('student'));
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
            'location_id' => ['nullable', 'exists:locations,id'],
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
