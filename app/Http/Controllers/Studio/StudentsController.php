<?php

namespace App\Http\Controllers\Studio;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class StudentsController extends Controller
{
    public function index()
    {
        return view('studio.students.index');
    }

    public function store(Request $request)
    {
        Student::create($this->studentAttributes($this->validateStudent($request)));

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
            'parent_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date_format:m/d/Y'],
            'is_adult' => ['nullable', 'boolean'],
        ]);
    }

    private function studentAttributes(array $data)
    {
        return [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'parent_name' => $data['parent_name'] ?? null,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'is_adult' => $data['is_adult'] ?? false,
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
