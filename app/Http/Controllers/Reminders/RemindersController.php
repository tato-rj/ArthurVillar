<?php

namespace App\Http\Controllers\Reminders;

use App\Http\Controllers\Controller;

class RemindersController extends Controller
{
    public function index()
    {
        return view('reminders.index');
    }
}
