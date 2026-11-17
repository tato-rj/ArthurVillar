<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\Student;

class LessonRecordsController extends Controller
{
    public function index()
    {
        return view('calendar.lessons.lessonRecords.index');
    }

    public function student(Student $student)
    {
        return view('calendar.lessons.lessonRecords.index', compact('student'));
    }
}
