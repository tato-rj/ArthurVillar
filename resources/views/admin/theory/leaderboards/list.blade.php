@forelse($leaderboard as $player)
    @include('admin.theory.leaderboards.entry')
@empty
    <div class="leaderboard-empty">No scores yet. Be the first!</div>
@endforelse
