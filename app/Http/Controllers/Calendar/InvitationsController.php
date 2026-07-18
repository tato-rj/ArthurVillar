<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\Invitation;
use App\Models\Calendar\InvitationOption;
use App\Models\Calendar\InvitationVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvitationsController extends Controller
{
    public function index()
    {
        return view('calendar.invitations.index');
    }

    public function edit(Invitation $invitation)
    {
        $invitation->load(['options' => function ($query) {
            $query->orderBy('starts_at');
        }]);

        return view('calendar.invitations.edit', compact('invitation'));
    }

    public function results(Invitation $invitation)
    {
        $invitation
            ->loadCount('participants')
            ->load(['options' => function ($query) {
                $query
                    ->with(['votes.participant'])
                    ->withCount([
                        'votes as yes_responses_count' => function ($query) {
                            $query->where('status', InvitationVote::YES);
                        },
                        'votes as maybe_responses_count' => function ($query) {
                            $query->where('status', InvitationVote::MAYBE);
                        },
                    ])
                    ->orderBy('starts_at');
            }]);

        $rankedOptions = $invitation->options
            ->sort(function (InvitationOption $first, InvitationOption $second) {
                $yesComparison = $second->yes_responses_count <=> $first->yes_responses_count;

                if ($yesComparison !== 0) {
                    return $yesComparison;
                }

                $firstTotal = $first->yes_responses_count + $first->maybe_responses_count;
                $secondTotal = $second->yes_responses_count + $second->maybe_responses_count;

                return ($secondTotal <=> $firstTotal)
                    ?: ($first->starts_at->timestamp <=> $second->starts_at->timestamp);
            });

        $topOption = $rankedOptions
            ->first(fn (InvitationOption $option) => $option->yes_responses_count > 0);

        $winners = $topOption
            ? $rankedOptions->filter(function (InvitationOption $option) use ($topOption) {
                return $option->yes_responses_count === $topOption->yes_responses_count
                    && $option->maybe_responses_count === $topOption->maybe_responses_count;
            })
            : collect();

        $secondBest = $winners->count() === 1
            ? $invitation->options
            ->reject(fn (InvitationOption $option) => $winners->contains('id', $option->id))
            ->sort(function (InvitationOption $first, InvitationOption $second) {
                $firstTotal = $first->yes_responses_count + $first->maybe_responses_count;
                $secondTotal = $second->yes_responses_count + $second->maybe_responses_count;
                $totalComparison = $secondTotal <=> $firstTotal;

                if ($totalComparison !== 0) {
                    return $totalComparison;
                }

                return ($second->yes_responses_count <=> $first->yes_responses_count)
                    ?: ($first->starts_at->timestamp <=> $second->starts_at->timestamp);
            })
            ->first(function (InvitationOption $option) {
                return ($option->yes_responses_count + $option->maybe_responses_count) > 0;
            })
            : null;

        $winnerOptionIds = $winners->modelKeys();
        $secondBestOptionId = $secondBest?->id;

        return view('calendar.invitations.results', compact(
            'invitation',
            'winnerOptionIds',
            'secondBestOptionId'
        ));
    }

    public function store(Request $request)
    {
        $data = $this->validateInvitation($request);

        DB::transaction(function () use ($data) {
            $invitation = Invitation::create($this->invitationAttributes($data));

            $this->syncOptions($invitation, $data['options']);
        });

        return redirect()
            ->route('calendar.invitations.index')
            ->with('success', 'The invitation was successfully created');
    }

    public function update(Request $request, Invitation $invitation)
    {
        $data = $this->validateInvitation($request);

        DB::transaction(function () use ($invitation, $data) {
            $invitation->update($this->invitationAttributes($data));

            $this->syncOptions($invitation, $data['options']);
        });

        return back()->with('success', 'The invitation was successfully updated');
    }

    public function destroy(Invitation $invitation)
    {
        $invitation->delete();

        return redirect()
            ->route('calendar.invitations.index')
            ->with('success', 'The invitation was successfully deleted');
    }

    private function validateInvitation(Request $request): array
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

    private function invitationAttributes(array $data): array
    {
        return [
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'duration_minutes' => $data['duration_minutes'],
        ];
    }

    private function syncOptions(Invitation $invitation, array $startsAt): void
    {
        $startsAt = collect($startsAt)
            ->map(function ($value) {
                return str_replace('T', ' ', $value).':00';
            })
            ->values();

        $invitation->options()
            ->whereNotIn('starts_at', $startsAt->all())
            ->delete();

        $startsAt->each(function ($startsAt) use ($invitation) {
            InvitationOption::firstOrCreate([
                'invitation_id' => $invitation->id,
                'starts_at' => $startsAt,
            ]);
        });
    }
}
