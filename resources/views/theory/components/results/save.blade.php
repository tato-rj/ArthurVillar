@php
    $seeds = range(1, 78);
    shuffle($seeds);
@endphp

@modal(['title' => 'Join the Leaderboard', 'id' => 'save-results-modal'])

<div>
<p>Your <strong>final score</strong> is based on 4 things:</p>
<ul>
    <li>Your score</li>
    <li>Your accuracy</li>
    <li>How many rounds you played</li>
    <li>How fast you finished</li>
</ul>
<p>Higher score, better accuracy, more rounds, and faster time will all increase your final score.</p>

</div>

<form method="POST" action="{{route('theory.leaderboard.store')}}">
	@csrf

    <input type="hidden" name="game" value="{{$settings->gameName()}}">

    <input type="hidden" name="rounds">
    <input type="hidden" name="score">
    <input type="hidden" name="accuracy">
    <input type="hidden" name="duration">

	<div class="form-group">
		<label class="text-grey mb-1 small">Select your username</label>
		<input class="form-control" required placeholder="Username" name="username">
	</div>
	<div class="form-group">
		<label class="text-grey mb-1 small">Select your avatar</label>

        <div class="btn-group align-items-center justify-content-center flex-wrap avatar-picker" style="height: 240px; overflow-y: scroll;" role="group">

            @foreach($seeds as $seed)
                <div class="m-2 cursor-pointer avatar-option">
                    <input
                        type="radio"
                        required
                        class="btn-check"
                        name="avatar_url"
                        id="avatar-{{ $seed }}"
                        value="https://api.dicebear.com/9.x/bottts-neutral/svg?seed={{ $seed }}"
                        autocomplete="off"
                    >
                    <img
                        class="player-avatar"
                        src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed={{ $seed }}"
                        alt="Avatar {{ $seed }}"
                        style="width:52px; height:52px;"
                    >
                </div>
            @endforeach
        </div>
	</div>

	<button type="submit" class="btn btn-primary w-100">Post my results</button>
</form>

@endmodal
