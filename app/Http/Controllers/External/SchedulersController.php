<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use App\Models\External\Scheduler;
use App\Models\External\SchedulerOption;
use App\Models\External\SchedulerParticipant;
use App\Models\External\SchedulerVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SchedulersController extends Controller
{
    public function index()
    {
        return view('external.scheduler.index');
    }

    public function edit(Scheduler $scheduler)
    {
        $this->ensureOwner($scheduler);

        $scheduler->load(['options' => function ($query) {
            $query->orderBy('starts_at');
        }]);

        return view('external.scheduler.edit', compact('scheduler'));
    }

    public function results(Scheduler $scheduler)
    {
        $this->ensureOwner($scheduler);

        $scheduler
            ->loadCount('participants')
            ->load([
                'participants' => function ($query) {
                    $query->orderBy('name')->orderBy('id');
                },
                'options' => function ($query) {
                    $query
                        ->with(['votes.participant'])
                        ->withCount([
                            'votes as yes_responses_count' => function ($query) {
                                $query->where('status', SchedulerVote::YES);
                            },
                            'votes as maybe_responses_count' => function ($query) {
                                $query->where('status', SchedulerVote::MAYBE);
                            },
                        ])
                        ->orderBy('starts_at');
                },
            ]);

        $winners = $scheduler->participants_count > 0
            ? $scheduler->options->filter(function (SchedulerOption $option) use ($scheduler) {
                return $option->yes_responses_count === $scheduler->participants_count;
            })
            : collect();

        $secondBest = $winners->count() === 1
            ? $scheduler->options
                ->reject(fn (SchedulerOption $option) => $winners->contains('id', $option->id))
                ->sort(function (SchedulerOption $first, SchedulerOption $second) {
                    $firstTotal = $first->yes_responses_count + $first->maybe_responses_count;
                    $secondTotal = $second->yes_responses_count + $second->maybe_responses_count;
                    $totalComparison = $secondTotal <=> $firstTotal;

                    if ($totalComparison !== 0) {
                        return $totalComparison;
                    }

                    return ($second->yes_responses_count <=> $first->yes_responses_count)
                        ?: ($first->starts_at->timestamp <=> $second->starts_at->timestamp);
                })
                ->first(function (SchedulerOption $option) {
                    return ($option->yes_responses_count + $option->maybe_responses_count) > 0;
                })
            : null;

        $winnerOptionIds = $winners->modelKeys();
        $secondBestOptionId = $secondBest?->id;

        return view('external.scheduler.results', compact(
            'scheduler',
            'winnerOptionIds',
            'secondBestOptionId'
        ));
    }

    public function store(Request $request)
    {
        $data = $this->validateScheduler($request);

        DB::transaction(function () use ($request, $data) {
            $scheduler = Scheduler::create([
                'user_id' => $request->user()->id,
                ...$this->schedulerAttributes($data),
            ]);

            $this->syncOptions($scheduler, $data['options']);
        });

        return redirect()
            ->route('scheduler.schedulers.index')
            ->with('success', 'The invitation was successfully created');
    }

    public function update(Request $request, Scheduler $scheduler)
    {
        $this->ensureOwner($scheduler);
        $data = $this->validateScheduler($request);

        DB::transaction(function () use ($scheduler, $data) {
            $scheduler->update($this->schedulerAttributes($data));

            $this->syncOptions($scheduler, $data['options']);
        });

        return redirect()
            ->route('scheduler.schedulers.index')
            ->with('success', 'The invitation was successfully updated');
    }

    public function destroy(Scheduler $scheduler)
    {
        $this->ensureOwner($scheduler);
        $scheduler->delete();

        return redirect()
            ->route('scheduler.schedulers.index')
            ->with('success', 'The invitation was successfully deleted');
    }

    public function destroyParticipant(Scheduler $scheduler, SchedulerParticipant $participant)
    {
        $this->ensureOwner($scheduler);
        abort_unless($participant->scheduler_id === $scheduler->id, 404);

        $participant->delete();

        return redirect()
            ->route('scheduler.schedulers.index')
            ->with('success', 'The participant responses were successfully deleted');
    }

    private function ensureOwner(Scheduler $scheduler): void
    {
        abort_unless($scheduler->user_id === request()->user()->id, 404);
    }

    private function validateScheduler(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:10000'],
            'duration_minutes' => ['required', 'integer', 'min:5', 'max:1440'],
            'options' => ['required', 'array', 'min:1'],
            'options.*' => ['required', 'date_format:Y-m-d\\TH:i', 'distinct'],
        ], [
            'options.required' => 'Add at least one proposed time.',
            'options.min' => 'Add at least one proposed time.',
            'options.*.required' => 'Every proposed time must include a date and time.',
            'options.*.date_format' => 'Every proposed time must include a valid date and time.',
            'options.*.distinct' => 'Each proposed time must be unique.',
        ]);
    }

    private function schedulerAttributes(array $data): array
    {
        return [
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'duration_minutes' => $data['duration_minutes'],
        ];
    }

    private function syncOptions(Scheduler $scheduler, array $startsAt): void
    {
        $startsAt = collect($startsAt)
            ->map(function ($value) {
                return str_replace('T', ' ', $value).':00';
            })
            ->values();

        $scheduler->options()
            ->whereNotIn('starts_at', $startsAt->all())
            ->delete();

        $startsAt->each(function ($startsAt) use ($scheduler) {
            SchedulerOption::firstOrCreate([
                'scheduler_id' => $scheduler->id,
                'starts_at' => $startsAt,
            ]);
        });
    }
}
