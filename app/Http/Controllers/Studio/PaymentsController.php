<?php

namespace App\Http\Controllers\Studio;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentsController extends Controller
{
    public function index()
    {
        return view('studio.payments.index');
    }

    public function store(Request $request, Lesson $lesson)
    {
        $lesson->pay();

        return response()->json([
            'status' => $lesson->paymentStatus()
        ]);
    }
}
