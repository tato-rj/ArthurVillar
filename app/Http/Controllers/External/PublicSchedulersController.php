<?php

namespace App\Http\Controllers\External;

use App\Http\Controllers\Controller;
use App\Models\External\Scheduler;
use App\Models\External\SchedulerParticipant;
use App\Models\External\SchedulerVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PublicSchedulersController extends Controller
{
    public function show(Request $request, Scheduler $scheduler)
    {
        $scheduler->load(['options' => function ($query) {
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
        }]);

        $participant = $this->participant($request, $scheduler);
        $responses = $participant
            ? $participant->votes()
                ->whereIn('scheduler_option_id', $scheduler->options->modelKeys())
                ->pluck('status', 'scheduler_option_id')
            : collect();

        return view('external.scheduler.public', compact('scheduler', 'participant', 'responses'));
    }

    public function store(Request $request, Scheduler $scheduler)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'responses' => ['nullable', 'array'],
            'responses.*' => ['nullable', Rule::in(['no', SchedulerVote::YES, SchedulerVote::MAYBE])],
        ]);

        $participant = DB::transaction(function () use ($request, $scheduler, $data) {
            $participant = $this->participant($request, $scheduler)
                ?? $scheduler->participants()->create(['name' => $data['name']]);

            $participant->update(['name' => $data['name']]);

            $validOptionIds = $scheduler->options()->pluck('id');
            $submittedResponses = collect($data['responses'] ?? [])
                ->only($validOptionIds->map(fn ($id) => (string) $id)->all())
                ->filter(fn ($status) => in_array($status, [SchedulerVote::YES, SchedulerVote::MAYBE], true));

            $participant->votes()
                ->whereIn('scheduler_option_id', $validOptionIds)
                ->whereNotIn('scheduler_option_id', $submittedResponses->keys())
                ->delete();

            $submittedResponses->each(function ($status, $optionId) use ($participant) {
                $participant->votes()->updateOrCreate([
                    'scheduler_option_id' => $optionId,
                ], [
                    'status' => $status,
                ]);
            });

            return $participant;
        });

        $request->session()->put($this->participantSessionKey($scheduler), $participant->id);

        return redirect()->to($request->fullUrl())->with('success', 'Your availability was saved');
    }

    private function participant(Request $request, Scheduler $scheduler): ?SchedulerParticipant
    {
        $participantId = $request->session()->get($this->participantSessionKey($scheduler));

        return $participantId
            ? $scheduler->participants()->whereKey($participantId)->first()
            : null;
    }

    private function participantSessionKey(Scheduler $scheduler): string
    {
        return "scheduler.participants.{$scheduler->id}";
    }
}
