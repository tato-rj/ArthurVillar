<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\Invitation;
use App\Models\Calendar\InvitationParticipant;
use App\Models\Calendar\InvitationVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PublicInvitationsController extends Controller
{
    public function show(Request $request, Invitation $invitation)
    {
        $invitation->load(['options' => function ($query) {
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

        $participant = $this->participant($request, $invitation);
        $responses = $participant
            ? $participant->votes()
                ->whereIn('invitation_option_id', $invitation->options->modelKeys())
                ->pluck('status', 'invitation_option_id')
            : collect();

        return view('calendar.invitations.public', compact('invitation', 'participant', 'responses'));
    }

    public function store(Request $request, Invitation $invitation)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'responses' => ['nullable', 'array'],
            'responses.*' => ['nullable', Rule::in(['no', InvitationVote::YES, InvitationVote::MAYBE])],
        ]);

        $participant = DB::transaction(function () use ($request, $invitation, $data) {
            $participant = $this->participant($request, $invitation)
                ?? $invitation->participants()->create(['name' => $data['name']]);

            $participant->update(['name' => $data['name']]);

            $validOptionIds = $invitation->options()->pluck('id');
            $submittedResponses = collect($data['responses'] ?? [])
                ->only($validOptionIds->map(fn ($id) => (string) $id)->all())
                ->filter(fn ($status) => in_array($status, [InvitationVote::YES, InvitationVote::MAYBE], true));

            $participant->votes()
                ->whereIn('invitation_option_id', $validOptionIds)
                ->whereNotIn('invitation_option_id', $submittedResponses->keys())
                ->delete();

            $submittedResponses->each(function ($status, $optionId) use ($participant) {
                $participant->votes()->updateOrCreate([
                    'invitation_option_id' => $optionId,
                ], [
                    'status' => $status,
                ]);
            });

            return $participant;
        });

        $request->session()->put($this->participantSessionKey($invitation), $participant->id);

        return redirect()->to($request->fullUrl())->with('success', 'Your availability was saved');
    }

    private function participant(Request $request, Invitation $invitation): ?InvitationParticipant
    {
        $participantId = $request->session()->get($this->participantSessionKey($invitation));

        return $participantId
            ? $invitation->participants()->whereKey($participantId)->first()
            : null;
    }

    private function participantSessionKey(Invitation $invitation): string
    {
        return "calendar.invitation_participants.{$invitation->id}";
    }
}
