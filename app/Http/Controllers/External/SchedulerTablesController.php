<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use App\Models\External\Scheduler;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class SchedulerTablesController extends Controller
{
    public function index(Request $request)
    {
        $schedulers = Scheduler::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->select([
                'schedulers.id',
                'schedulers.public_id',
                'schedulers.title',
                'schedulers.description',
                'schedulers.duration_minutes',
                'schedulers.created_at',
            ])
            ->withCount(['options', 'participants']);

        return DataTables::eloquent($schedulers)
            ->addColumn('public_url', function (Scheduler $scheduler) {
                return $scheduler->publicUrl();
            })
            ->editColumn('created_at', function (Scheduler $scheduler) {
                return $scheduler->created_at?->toIso8601String();
            })
            ->orderColumn('options_count', 'options_count $1')
            ->orderColumn('participants_count', 'participants_count $1')
            ->toJson();
    }
}
