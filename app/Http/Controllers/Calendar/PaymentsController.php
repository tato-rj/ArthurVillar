<?php

namespace App\Http\Controllers\Calendar;

use App\Models\Calendar\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentsController extends Controller
{
    public function store(Request $request, Lesson $lesson)
    {
        $lesson->pay();

        return response()->json([
            'status' => $lesson->paymentStatus()
        ]);
    }
}
