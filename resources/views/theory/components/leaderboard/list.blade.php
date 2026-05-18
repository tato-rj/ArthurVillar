@forelse($leaderboard as $player)
	@include(subdomain('admin') ? 'admin.leaderboards.entry' : 'theory.components.leaderboard.player')
@empty
<div class="p-5 d-center">
	<div>
		<p class=" fst-italic text-grey opacity-6 fw-bold">No players yet...</p>
	</div>
</div>
@endforelse