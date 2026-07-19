@modal(['title' => $invitation->title, 'id' => 'invitation-results-modal'])
    <div class="mb-4 invitation-results-response-count">
        <strong>@fa(['icon' => 'users']){{ $invitation->participants_count }}</strong>
        {{ Str::plural('person', $invitation->participants_count) }} responded
    </div>

    @foreach($invitation->options->groupBy(fn ($option) => $option->starts_at->toDateString()) as $options)
        <div class="mb-4">
            <h6 class="mb-3">{{ $options->first()->starts_at->format('l, F j, Y') }}</h6>

            @foreach($options as $option)
                @php
                    $yesResponses = $option->votes->where('status', \App\Models\Calendar\InvitationVote::YES);
                    $maybeResponses = $option->votes->where('status', \App\Models\Calendar\InvitationVote::MAYBE);
                    $endsAt = $option->starts_at->copy()->addMinutes($invitation->duration_minutes);
                    $resultStatus = in_array($option->id, $winnerOptionIds, true)
                        ? 'winner'
                        : ($option->id === $secondBestOptionId ? 'second-best' : null);
                @endphp

                <div class="invitation-result rounded-sm p-3 border-5 mb-3 bg-light" data-option-id="{{ $option->id }}"@if($resultStatus) data-status="{{ $resultStatus }}"@endif>
                    <div class="d-apart mb-3">
                        <h6 class="mb-0 small">
                            {{ $option->starts_at->format('g:i A') }} to {{ $endsAt->format('g:i A') }}
                        </h6>
                        <h6 class="mb-0 small">
                            @if($resultStatus === 'winner')
                                <span class="text-green">@fa(['icon' => 'trophy', 'mr' => 0])</span>
                            @elseif($resultStatus === 'second-best')
                                <span class="text-yellow">@fa(['icon' => 'medal', 'mr' => 0])</span>
                            @endif
                        </h6>
                    </div>

                    @foreach($yesResponses as $response)
                        <span data-status="yes" class="invitation-result-name alert-green rounded px-2 py-1 border-green border">{{ $response->participant->name }}</span>
                    @endforeach

                    @foreach($maybeResponses as $response)
                        <span data-status="maybe" class="invitation-result-name alert-yellow rounded px-2 py-1 border border-yellow">{{ $response->participant->name }}</span>
                    @endforeach

                    @if($yesResponses->isEmpty() && $maybeResponses->isEmpty())
                        <p class="opacity-6 mb-0">No responses for this time.</p>
                    @endif
                </div>
            @endforeach
        </div>
    @endforeach
@endmodal
