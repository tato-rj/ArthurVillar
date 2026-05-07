<div class="leaderboard-player mb-2 {{$loop->iteration <=3 ? 'bg-light' : null}} rounded {{$player->is(session('newPlayer')) ? 'border border-green' : null}}">
	<div class="d-flex justify-content-between pr-4 pl-3 py-2">
		<div class="d-flex align-items-center">
			<div class="mr-3">
				<div style="width: 28px; height: 28px" class="bg-white border d-center small rounded-circle">{{$loop->iteration}}</div>
			</div>
			<div class="d-flex align-items-center mr-4">
				<img class="mr-3 player-avatar" src="{{$player->avatar_url}}">
				<div>
					<h6 class="mb-1 fw-bold">{{$player->username}}</h6>
					<p class="m-0 text-grey">{{$player->finalScore}} pts</p>
				</div>
			</div>
		</div>
		<div class="text-right">
			<p class="text-grey mb-2" style="font-size: 70%;">{{$player->created_at->diffForHumans()}}</p>
			@if($loop->iteration == 1)
			<div style="color: #FFD700">@fa(['icon' => 'medal', 'fa_size' => 'xl', 'mr' => 0])</div>
			@elseif($loop->iteration == 2)
			<div style="color: #C0C0C0">@fa(['icon' => 'medal', 'fa_size' => 'xl', 'mr' => 0])</div>
			@elseif($loop->iteration == 3)
			<div style="color: #CD7F32">@fa(['icon' => 'medal', 'fa_size' => 'xl', 'mr' => 0])</div>
			@endif
		</div>
	</div>
</div>