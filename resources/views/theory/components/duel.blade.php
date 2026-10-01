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
@modal(['title' => 'Multiplayer Duel', 'id' => 'duel-modal'])
<div class="duel-dialog text-center" aria-live="polite">
    <div data-duel-message></div>
    <div data-duel-code class="duel-code" hidden></div>
    <form data-duel-join-form hidden>
        <label id="duel-code-label" for="duel-join-code" class="mb-3">Enter your duel code</label>
        <div class="duel-code-inputs" role="group" aria-labelledby="duel-code-label">
            @for($digit = 0; $digit < 4; $digit++)
            <input id="{{ $digit === 0 ? 'duel-join-code' : 'duel-join-digit-'.($digit + 1) }}" data-duel-digit type="text" inputmode="numeric" pattern="[0-9]" maxlength="1" autocomplete="{{ $digit === 0 ? 'one-time-code' : 'off' }}" class="form-control duel-code-input" required aria-label="Digit {{ $digit + 1 }} of 4" aria-describedby="duel-error">
            @endfor
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">Join</button>
        <section class="duel-create-tip" aria-labelledby="duel-create-tip-title">
            <span class="duel-create-tip__icon" aria-hidden="true">@fa(['icon' => 'gear', 'mr' => 0])</span>
            <div>
                <h5 id="duel-create-tip-title">Want to create a duel?</h5>
                <p>Open the settings menu in any game, then choose <strong>“Start Multiplayer Duel”</strong>.</p>
            </div>
        </section>
    </form>
    <p id="duel-error" data-duel-error class="text-danger mt-3 m-0" role="alert"></p>
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
