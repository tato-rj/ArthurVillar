@extends('layouts.app', ['title' => $invitation->title, 'noMenu' => true])

@push('header')
<link href="{{ mix('css/schedule.css') }}" rel="stylesheet">
<style>
    input[name="name"] {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid lightgrey;
        font-size: 1.1rem;
    }

    .invitation-response-option {
        display: grid;
        grid-template-columns: 52px minmax(180px, 1fr) auto;
        align-items: center;
        gap: 1rem;
        {{-- min-height: 76px; --}}
        {{-- padding: 1rem 1.25rem; --}}
        border: 1px solid #d8dce1;
        {{-- border-radius: 6px; --}}
        background: #f8f9fa;
        cursor: pointer;
        transition: background-color .15s ease, border-color .15s ease;
    }

    .invitation-response-option[data-state="yes"] {
        border-color: #addbb7;
        background: #dcf8df;
    }

    .invitation-response-option[data-state="maybe"] {
        border-color: #e2cd77;
        background: #fff6cf;
    }

    .invitation-response-choice {
        width: 32px;
        height: 32px;
        padding: 0;
        border: 2px solid #6c757d;
        background: #fff;
        color: #6c757d;
        font-size: 1rem;
    }

    .invitation-response-choice .fa-xmark, .invitation-instructions-option[data-state="blank"] {
        opacity: .3;
    }

    .invitation-response-option[data-state="yes"] .invitation-response-choice, .invitation-instructions-option[data-state="yes"] {
        border-color: #087457;
        background: #087457;
        color: #fff;
    }

    .invitation-response-option[data-state="maybe"] .invitation-response-choice, .invitation-instructions-option[data-state="maybe"] {
        border-color: #c99700;
        background: #f2c94c;
        color: #4a3a00;
    }

    .invitation-response-time {
        font-size: 1.15rem;
        font-weight: 700;
    }

    .invitation-response-summary {
        padding: .35rem .5rem;
        border: 0;
        background: transparent;
        color: #0b62c4;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
    }

    .invitation-response-summary:hover,
    .invitation-response-summary:focus {
        color: #074b95;
        text-decoration: underline;
    }

    .invitation-responder-list {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .invitation-responder-list li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .65rem 0;
        border-bottom: 1px solid #edf0f2;
    }

    .invitation-responder-list li:last-child {
        border-bottom: 0;
    }

    @media (max-width: 575.98px) {
        .invitation-response-option {
            grid-template-columns: 42px 1fr auto;
            gap: .75rem;
            padding: .85rem;
        }

        .invitation-response-summary {
            font-size: .82rem;
        }
    }

    .invitation-instructions-option {
        font-size: .8rem;
        width: 22px;
        height: 22px;
        border: 1px solid;
    }

    #invitation-responses-content h5 {
        font-size: 100%;
    }


</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
            <div class="mb-4 text-center px-4">
                <h1 class="mb-0">{{ $invitation->title }}</h1>
                {{-- <p class="text-muted">Click once for Yes, twice for Maybe, or leave an option empty for No.</p> --}}
                @if($invitation->description)
                    <p class="text-muted mb-0 mt-2">{{ $invitation->description }}</p>
                @endif

                <div id="invitation-instructions" class="d-center mt-4">
                    <div>
                        <div class="d-flex align-items-center mb-2">
                            <div class="invitation-instructions-option rounded d-center mr-2" data-state="yes">@fa(['icon' => 'check', 'mr' => 0])</div>
                            <div>One click for <strong>YES</strong></div>
                        </div>

                        <div class="d-flex align-items-center mb-2">
                            <div class="invitation-instructions-option rounded d-center mr-2" data-state="maybe">@fa(['icon' => 'minus', 'mr' => 0])</div>
                            <div>Two clicks for <strong>MAYBE</strong></div>
                        </div>

                        <div class="d-flex align-items-center">
                            <div class="invitation-instructions-option rounded d-center mr-2" data-state="blank">@fa(['icon' => 'xmark', 'mr' => 0])</div>
                            <div>Leave blank for <strong>NO</strong></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="invitation-response-card p-2">
                <form method="POST" action="{{ request()->fullUrl() }}">
                    @csrf

                    <div class="mb-5">
                        <div class="form-group">
                            <small>Your name<span class="text-red">*</span></small>
                            <input class="w-100 h-100 py-2 px-3" type="text" placeholder="Please enter your name here..." name="name" value="{{$participant?->name}}" required data-required="">
                        </div>
                    </div>

                    @foreach($invitation->options->groupBy(fn ($option) => $option->starts_at->toDateString()) as $date => $options)
                        <div class="mt-5">
                            <h5 class="mb-3">{{ $options->first()->starts_at->format('l, F j, Y') }}</h5>

                            <div>
                                @foreach($options as $option)
                                    @php
                                        $state = old("responses.{$option->id}", $responses->get($option->id, 'no'));
                                        $duration = $invitation->duration_minutes;
                                        $yesResponses = $option->votes->where('status', \App\Models\Calendar\InvitationVote::YES);
                                        $maybeResponses = $option->votes->where('status', \App\Models\Calendar\InvitationVote::MAYBE);
                                        $endsAt = $option->starts_at->copy()->addMinutes($duration);
                                    @endphp

                                    <div class="invitation-response-option p-3 mb-3 rounded" data-state="{{ $state }}">
                                        <button
                                            type="button"
                                            class="invitation-response-choice rounded"
                                            data-response-choice
                                            data-state="{{ $state }}"
                                            role="checkbox"
                                            aria-checked="{{ $state === 'maybe' ? 'mixed' : ($state === 'yes' ? 'true' : 'false') }}"
                                            aria-label="{{ $option->starts_at->format('g:i A') }} availability: {{ $state }}">
                                            <i class="{{ $state === 'no' ? 'fas fa-xmark' : ($state === 'yes' ? 'fas fa-check' : 'fas fa-minus') }}"></i>
                                        </button>

                                        <input type="hidden" name="responses[{{ $option->id }}]" value="{{ $state }}">

                                        <div class="invitation-response-time">
                                            {{ $option->starts_at->format('g:i A') }} to {{ $endsAt->format('g:i A') }}
                                        </div>
                                        <button
                                            type="button"
                                            class="invitation-response-summary"
                                            data-response-summary
                                            data-responses-template="invitation-responses-{{ $option->id }}"
                                            aria-label="Show responses for {{ $option->starts_at->format('g:i A') }}">
                                            @fa(['icon' => 'users'])
                                            {{ $option->yes_responses_count }} yes
                                            @if($option->maybe_responses_count)
                                                · {{ $option->maybe_responses_count }} maybe
                                            @endif
                                        </button>

                                        <template id="invitation-responses-{{ $option->id }}">
                                            @if($yesResponses->isEmpty() && $maybeResponses->isEmpty())
                                                <p class="text-muted mb-0">No one has responded for this time yet.</p>
                                            @else
                                                @if($yesResponses->isNotEmpty())
                                                    <h5 class="mb-2 alert-green rounded px-2 py-1 border border-green d-inline-block">YES</h5>
                                                    <ul class="invitation-responder-list" data-response="yes">
                                                        @foreach($yesResponses as $response)
                                                            <li>
                                                                <span>{{ $response->participant->name }}</span>
                                                                @if($participant?->is($response->participant))
                                                                    <small class="text-muted">You</small>
                                                                @endif
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                @endif

                                                @if($maybeResponses->isNotEmpty() && $yesResponses->isNotEmpty())
                                                <div class="my-2"></div>
                                                @endif

                                                @if($maybeResponses->isNotEmpty())
                                                    <h5 class="mb-2 alert-yellow rounded px-2 py-1 border border-yellow d-inline-block">MAYBE</h5>
                                                    <ul class="invitation-responder-list" data-response="maybe">
                                                        @foreach($maybeResponses as $response)
                                                            <li>
                                                                <span>{{ $response->participant->name }}</span>
                                                                @if($participant?->is($response->participant))
                                                                    <small class="text-muted">You</small>
                                                                @endif
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                @endif
                                            @endif
                                        </template>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endforeach

                    <div class="text-center mt-5">
                        @submit(['label' => $participant ? 'Update availability' : 'Save availability', 'theme' => 'primary', 'classes' => 'btn-wide'])
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

@modal(['title' => 'Responses', 'id' => 'invitation-responses-modal'])
    <div id="invitation-responses-content"></div>
@endmodal
@endsection

@push('scripts')
<script>
$(function() {
    const stateIcons = {
        no: 'fas fa-xmark',
        yes: 'fas fa-check',
        maybe: 'fas fa-minus',
    };
    const nextState = {
        no: 'yes',
        yes: 'maybe',
        maybe: 'no',
    };

    const advanceChoice = function(button) {
        const option = button.closest('.invitation-response-option');
        const input = option.querySelector('input[type="hidden"]');
        const state = nextState[button.dataset.state] || 'yes';

        button.dataset.state = state;
        button.setAttribute('aria-checked', state === 'maybe' ? 'mixed' : (state === 'yes' ? 'true' : 'false'));
        button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/availability: (no|yes|maybe)$/, `availability: ${state}`));
        button.querySelector('i').className = stateIcons[state];
        option.dataset.state = state;
        input.value = state;
    };

    const showModal = function(modal) {
        if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
            window.bootstrap.Modal.getOrCreateInstance(modal).show();
            return;
        }

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(modal).modal('show');
        }
    };

    $('[data-response-choice]').on('click', function(event) {
        event.stopPropagation();
        advanceChoice(this);
    });

    $('.invitation-response-option').on('click', function(event) {
        if ($(event.target).closest('[data-response-summary]').length) {
            return;
        }

        advanceChoice(this.querySelector('[data-response-choice]'));
    });

    $('[data-response-summary]').on('click', function(event) {
        event.stopPropagation();

        const modal = document.getElementById('invitation-responses-modal');
        const template = document.getElementById(this.dataset.responsesTemplate);
        const content = document.getElementById('invitation-responses-content');

        content.replaceChildren(template.content.cloneNode(true));
        showModal(modal);
    });
});
</script>
@endpush
