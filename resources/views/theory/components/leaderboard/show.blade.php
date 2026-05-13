@modal(['title' => fa('ranking-star').'Leaderboard', 'class' => 'leaderboard', 'id' => 'leaderboard-'.str_slug($settings->gameName()).'-modal', 'autoshow' => (bool) session('newPlayer')])
@forelse($settings->leaderboard() as $player)
	@include('theory.components.leaderboard.player')
@empty
<div class="p-5 d-center">
	<div>
		<p class=" fst-italic text-grey opacity-6 fw-bold">No players yet...</p>
	</div>
</div>
@endforelse

@unless($settings->leaderboard()->isEmpty())
<div class="bg-light p-3 rounded mt-3 border">
    <p class="mb-1 fw-bold">@fa(['icon' => 'lightbulb', 'fa_color' => 'yellow'])How are my <u>points</u> calculated?</p>
    <p class="m-0">Higher score, better accuracy, more rounds, and faster time will all increase your final points.</p>
</div>
@endunless
@endmodal
