<?php

namespace App\Http\Controllers\Studio;

use App\Models\Holiday;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HolidaysController extends Controller
{
    public function index()
    {
        $holidays = Holiday::query()
            ->orderBy('month')
            ->orderBy('day')
            ->orderBy('week_number')
            ->orderBy('title')
            ->get();

        return view('studio.holidays.index', compact('holidays'));
    }

    public function update(Request $request, Holiday $holiday)
    {
        $data = $request->validate([
            'is_observed' => ['nullable', 'boolean'],
        ]);

        $holiday->update([
            'is_observed' => $data['is_observed'] ?? false,
        ]);

        return back()->with('success', 'The holiday was successfully updated');
    }
}
