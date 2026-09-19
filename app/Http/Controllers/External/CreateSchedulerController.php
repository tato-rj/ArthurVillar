<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;

class CreateSchedulerController extends Controller
{
    public function __invoke()
    {
        return view('external.scheduler.create');
    }
}
