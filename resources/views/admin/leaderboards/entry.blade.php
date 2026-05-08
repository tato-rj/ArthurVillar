<div class="leaderboard-player {{$loop->last ? '' : 'mb-1 border-bottom pb-1'}}">
	<div class="d-flex justify-content-between pr-1 py-1">
		<div class="d-flex align-items-center flex-grow text-truncate">
			<div class="mr-3">
				<div style="width: 28px; height: 28px" class="bg-white border d-center small rounded-circle">{{$loop->iteration}}</div>
			</div>
			<div class="d-flex align-items-center mr-4 flex-grow text-truncate">
				<img class="mr-2 player-avatar rounded-circle" style="width: 42px" src="{{$player->avatar_url}}">
				<div class="text-left">
					<div class="d-flex my-1 flex-wrap" style="font-size: 60%;">
						<div class=" mr-2 text-orange">@fa(['icon' => 'gamepad', 'mr' => 1]){{$player->rounds}}</div>
						<div class=" mr-2 text-purple">@fa(['icon' => 'bolt', 'mr' => 1]){{$player->score}}</div>
						<div class=" mr-2 text-green">@fa(['icon' => 'bullseye', 'mr' => 1]){{$player->accuracyForHumans}}</div>
						<div class=" mr-2 text-blue">@fa(['icon' => 'clock', 'mr' => 1]){{$player->durationForHumans}}</div>
					</div>
					<h6 class="m-0 fw-bold text-truncate">{{$player->username}}</h6>
					<p class="m-0 text-grey text-truncate">{{$player->finalScore}} pts</p>
				</div>
			</div>
		</div>
		<div class="text-right mt-1">
			<p class="text-grey mb-2" style="font-size: 70%;">{{$player->created_at->diffForHumans()}}</p>
			<div>
				<form method="POST" confirm action="{{route('admin.leaderboard.destroy', $player)}}">
					@csrf
					@method('DELETE')
					<button type="submit" class="btn btn-sm btn-red text-nowrap">@fa(['icon' => 'trash-alt', 'mr' => 0])</button>
				</form>
			</div>
		</div>
	</div>
</div>