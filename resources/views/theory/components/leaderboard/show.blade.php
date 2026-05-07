@modal(['title' => fa('ranking-star').'Leaderboard', 'id' => 'leaderboard-modal', 'autoshow' => (bool) session('newPlayer')])
@forelse($settings->leaderboard() as $player)
	@include('theory.components.leaderboard.player')
@empty
<div class="p-5 d-center">No players yet...</div>
@endforelse
{{-- @for($i=1;$i<=10;$i++)
	@include('theory.components.leaderboard.player')
@endfor --}}
@endmodal
