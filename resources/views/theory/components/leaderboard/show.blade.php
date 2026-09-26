@modal(['title' => fa('ranking-star').'Leaderboard', 'class' => 'leaderboard', 'id' => 'leaderboard-'.$settings->gameSlug().'-modal', 'autoshow' => (bool) session('newPlayer')])

<div class="leaderboard-wrapper">
	<div class="text-center mb-3">
		<div class="leaderboard-game">{{$settings->gameName()}}</div>
		@include('theory.components.leaderboard.nav', ['name' => $settings->gameName()])
	</div>

	<div class="leaderboard-players">
		@include('theory.components.leaderboard.list', ['leaderboard' => $settings->leaderboard(20)])
	</div>
</div>
@endmodal
