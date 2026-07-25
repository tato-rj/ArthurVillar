<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\Student;

class LessonRecordsController extends Controller
{
    public function index()
    {
        return view('calendar.lessonRecords.index');
    }

    public function student(Student $student)
    {
        $student->load('lessonPlans.location');

        return view('calendar.lessonRecords.student', compact('student'));
    }
}
