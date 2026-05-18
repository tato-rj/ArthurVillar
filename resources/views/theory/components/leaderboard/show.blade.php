@modal(['title' => fa('ranking-star').'Leaderboard', 'class' => 'leaderboard', 'id' => 'leaderboard-'.str_slug($settings->gameName()).'-modal', 'autoshow' => (bool) session('newPlayer')])
<div style="max-height: 600px; overflow-y: scroll;" class="p-2">
	@forelse($settings->leaderboard() as $player)
		@include('theory.components.leaderboard.player')
	@empty
	<div class="p-5 d-center">
		<div>
			<p class=" fst-italic text-grey opacity-6 fw-bold">No players yet...</p>
		</div>
	</div>
	@endforelse
</div>
@endmodal
