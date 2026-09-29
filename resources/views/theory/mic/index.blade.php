@extends('layouts.app', ['title' => 'Microphone'])

@section('content')
<section class="container py-5" style="max-width: 760px" id="microphone-page">
    @pagetitle(['label' => 'Microphone'])

    <p class="text-center mb-4">Set your phone or tablet where you play, then test a note at your normal volume. Changes take effect in the test immediately; saved settings apply to every player in all microphone games.</p>

    <form id="microphone-settings" data-save-url="{{ route('theory.mic.update') }}">
        <div class="card p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <label for="mic-sensitivity" class="fw-bold mb-0">Sensitivity</label>
                <output id="mic-sensitivity-value" for="mic-sensitivity">{{ $microphoneSettings['sensitivity'] }}%</output>
            </div>
            <input id="mic-sensitivity" name="sensitivity" type="range" class="form-range" min="0" max="100" step="1" value="{{ $microphoneSettings['sensitivity'] }}">
            <div class="d-flex justify-content-between small text-muted"><span>Less sensitive</span><span>More sensitive</span></div>
            <p class="small text-muted mt-2 mb-0">Raise this if normal notes are missed. Lower it if room noise triggers notes.</p>
        </div>

        <div class="card p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <label for="mic-settle-ms" class="fw-bold mb-0">Time to capture a steady pitch</label>
                <output id="mic-settle-value" for="mic-settle-ms">{{ number_format($microphoneSettings['settleMs'] / 1000, 1) }} seconds</output>
            </div>
            <input id="mic-settle-ms" name="settleMs" type="range" class="form-range" min="300" max="2500" step="100" value="{{ $microphoneSettings['settleMs'] }}">
            <div class="d-flex justify-content-between small text-muted"><span>0.3 seconds</span><span>2.5 seconds</span></div>
            <p class="small text-muted mt-2 mb-0">For singing, choose a longer time if your pitch needs a moment to settle.</p>
        </div>

        <div class="card p-4 mb-4">
            <h2 class="h5 mb-3">Test your microphone</h2>
            <button id="mic-test-toggle" class="btn btn-blue align-self-start" type="button">Start listening</button>
            <p id="mic-test-status" class="mt-3 mb-2" role="status">Tap Start listening, then play or sing a note.</p>
            <div class="progress mb-2" role="progressbar" aria-label="Sound level relative to the selected sensitivity" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="mic-level-meter" style="height: 12px">
                <div class="progress-bar" id="mic-level-bar" style="width: 0%"></div>
            </div>
            <p class="small text-muted mb-3">A full bar means the sound is loud enough for this setting. A steady musical pitch is also required.</p>
            <div>Current pitch: <strong id="mic-current-note">—</strong></div>
            <div>Last captured note: <strong id="mic-captured-note">—</strong></div>
        </div>

        <div class="d-flex align-items-center gap-3">
            <button id="mic-save" class="btn btn-blue" type="submit">Save settings</button>
            <span id="mic-save-status" role="status" aria-live="polite"></span>
        </div>
    </form>
</section>
@endsection

@push('scripts')
<script src="{{ mix('js/music/microphone.js') }}"></script>
@endpush
