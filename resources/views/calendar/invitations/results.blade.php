@extends('layouts.app', ['title' => 'Responses | '.$invitation->title])

@push('header')
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
<style>
    .invitation-result[data-status="winner"] {
        border-color: #58cc02 !important;
        border-left: 6px solid;
    }

    .invitation-result[data-status="second-best"] {
        border-color: #ffc800 !important;
        border-left: 6px solid;
    }

    .invitation-result-name {
        display: inline-block;
    }
</style>
@endpush

@section('content')
@include('calendar.invitations.home-icon')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
            @pagetitle([
                'label' => $invitation->title
            ])

            @if($invitation->description)
                <p class="text-muted text-center mb-4 px-4">{{ $invitation->description }}</p>
            @endif

            <div class="text-center mb-5" style="font-size: 1.2rem;">
                <strong>{{ $invitation->participants_count }}</strong>
                {{ Str::plural('person', $invitation->participants_count) }} responded
            </div>

            @foreach($invitation->options->groupBy(fn ($option) => $option->starts_at->toDateString()) as $options)
                <div class="mb-5">
                    <h5 class="mb-3">{{ $options->first()->starts_at->format('l, F j, Y') }}</h5>

                    @foreach($options as $option)
                        @php
                            $yesResponses = $option->votes->where('status', \App\Models\Calendar\InvitationVote::YES);
                            $maybeResponses = $option->votes->where('status', \App\Models\Calendar\InvitationVote::MAYBE);
                            $endsAt = $option->starts_at->copy()->addMinutes($invitation->duration_minutes);
                            $resultStatus = $option->id === $winnerOptionId
                                ? 'winner'
                                : ($option->id === $secondBestOptionId ? 'second-best' : null);
                        @endphp

                        <div class="invitation-result rounded-sm p-3  border-5 mb-3 bg-light" data-option-id="{{ $option->id }}"@if($resultStatus) data-status="{{ $resultStatus }}"@endif>
                            <div class="d-apart mb-3">
                                <h6 class="mb-0">
                                    {{ $option->starts_at->format('g:i A') }} to {{ $endsAt->format('g:i A') }}
                                </h6>
                                <h6 class="mb-0">
                                    @if($resultStatus == 'winner')
                                    <span class="text-green">@fa(['icon' => 'trophy'])WINNER</span>
                                    @elseif($resultStatus == 'second-best')
                                    <span class="text-yellow">SECOND BEST</span>
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
        </div>
    </div>
</section>
@endsection
