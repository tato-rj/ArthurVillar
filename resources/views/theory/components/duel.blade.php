@php
$duelConfig = config('theory-duels.client') + [
    'base' => route('theory.duels.store'),
    'auth' => route('theory.duels.broadcast-auth'),
    'home' => route('theory.home'),
];
@endphp
<script>
window.__duelConfig = @json($duelConfig);
window.__duelState = @json($duelState ?? null);
</script>
@modal(['title' => 'Multiplayer Duel', 'id' => 'duel-modal', 'data' => ['bs-backdrop' => 'static', 'bs-keyboard' => 'false']])
<div class="duel-dialog text-center" aria-live="polite">
    <div data-duel-message></div>
    <div data-duel-code class="duel-code" hidden></div>
    <form data-duel-join-form hidden>
        <label for="duel-join-code" class="mb-3">Enter your duel code</label>
        <input id="duel-join-code" name="code" type="text" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="one-time-code" class="form-control duel-code text-center" required aria-describedby="duel-error">
        <button type="submit" class="btn btn-primary w-100 mt-3">Join</button>
    </form>
    <p id="duel-error" data-duel-error class="text-danger mt-3" role="alert"></p>
    <div data-duel-idle class="mb-3" hidden>
        <p class="mb-2">Confirm to stay in the Duel. Otherwise, you’ll return to all games.</p>
        <span data-duel-idle-count class="fs-2 fw-bold text-danger">10</span>
    </div>
    <button type="button" data-duel-active class="btn btn-primary w-100" hidden>Yes, I’m still playing</button>
    <button type="button" data-duel-ready class="btn btn-primary w-100" hidden>START DUEL</button>
    <button type="button" data-duel-cancel class="btn btn-white w-100 mt-3" hidden>Cancel</button>
    <button type="button" data-duel-leave class="btn btn-white text-danger w-100 mt-3" hidden>Leave Duel</button>
    <a data-duel-exit href="{{ route('theory.home') }}" class="btn btn-white w-100 mt-3" hidden>All games</a>
</div>
@endmodal
