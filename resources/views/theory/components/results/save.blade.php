@modal(['title' => 'Join the Leaderboard', 'id' => 'save-results-modal'])

<form method="POST" action="{{route('theory.leaderboard.store')}}">
	@csrf

    <input type="hidden" name="game" value="{{$settings->gameName()}}">

    <input type="hidden" name="rounds">
    <input type="hidden" name="score">
    <input type="hidden" name="accuracy">
    <input type="hidden" name="duration">

	<div class="form-group">
		<label class="text-grey mb-1 small">Select your username</label>
		<input class="form-control" placeholder="Username" name="username">
	</div>
	<div class="form-group">
		<label class="text-grey mb-1 small">Select your avatar</label>

        <div class="btn-group align-items-center justify-content-center flex-wrap avatar-picker" role="group">
            @for($i = 1; $i <= 24; $i++)
                <div class="m-2 cursor-pointer avatar-option">
                    <input
                        type="radio"
                        class="btn-check"
                        name="avatar_url"
                        id="avatar-{{ $i }}"
                        value="https://api.dicebear.com/9.x/bottts-neutral/svg?seed={{ $i }}"
                        autocomplete="off"
                    >
                    <img
                        class="player-avatar"
                        src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed={{ $i }}"
                        alt="Avatar {{ $i }}"
                        style="width:52px; height:52px;"
                    >
                </div>
            @endfor
        </div>
	</div>

	<button type="submit" class="btn btn-primary w-100">Post my results</button>
</form>

@endmodal
