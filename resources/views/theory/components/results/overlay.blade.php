<div id="final-overlay" data-result-tier="excellent" data-result-variant="0" aria-labelledby="result-title">
    <div class="results-sheet">
        @include('theory.components.results.character')

        <div id="result-greeting" class="results-greeting">
            <p class="results-eyebrow">Session complete</p>
            <h1 id="result-title" tabindex="-1"></h1>
            <p id="result-message" class="results-message"></p>
        </div>

        <div id="metrics-boxes" class="results-metrics" aria-label="Your results">
            @include('theory.components.results.box', ['name' => 'score', 'title' => 'Your score', 'detail' => 'points earned', 'icon' => 'bolt'])
            @include('theory.components.results.box', ['name' => 'accuracy', 'title' => 'Accuracy', 'detail' => 'of your answers correct', 'icon' => 'bullseye'])
            @include('theory.components.results.box', ['name' => 'rounds', 'title' => 'Rounds played', 'icon' => 'gamepad'])
            @include('theory.components.results.box', ['name' => 'duration', 'title' => 'Time spent', 'icon' => 'clock'])
        </div>

        <div class="results-bonuses">
            <span id="double-points" class="results-bonus" style="display: none">@fa(['icon' => 'star'])Perfect game · 2× score</span>
            <span id="settings-bonus-earned" class="results-bonus results-bonus--settings" style="display: none">@fa(['icon' => 'gem'])Bonus points earned</span>
        </div>

        <div class="results-actions">
            <div class="btn-floating w-100">
                <button type="button" data-bs-toggle="modal" data-bs-target="#save-results-modal" class="btn btn-primary w-100">@fa(['icon' => 'star'])Join the leaderboard</button>
            </div>
            <div class="d-center">
                <button type="button" onclick="location.reload();" class="btn btn-white w-100 mr-1">@fa(['icon' => 'rotate-right'])Play again</button>
                <a href="{{route('theory.home')}}" class="btn btn-white w-100 ml-1">@fa(['icon' => 'house'])Back home</a>
            </div>
        </div>
    </div>
</div>

@include('theory.components.leaderboard.store')
