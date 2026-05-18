@modal(['title' => fa('ranking-star').'Leaderboard', 'class' => 'leaderboard', 'id' => 'leaderboard-'.$settings->gameSlug().'-modal', 'autoshow' => (bool) session('newPlayer')])

<div class="leaderboard-wrapper">
	<div class="text-center mb-3">
		@include('theory.components.leaderboard.nav', ['name' => $settings->gameName()])
	</div>

	<div style="max-height: 600px; overflow-y: scroll;" class="p-2 leaderboard-players">
		@include('theory.components.leaderboard.list', ['leaderboard' => $settings->leaderboard()])
	</div>
</div>
@endmodal
