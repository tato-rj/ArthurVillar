@php($leaderboardRange = request('range') === 'all' ? 'all' : 'week')
<div class="btn-group" role="group" aria-label="Leaderboard period">
    @foreach(['week' => 'Last 7 days', 'all' => 'All time'] as $range => $label)
        <div>
            <input singlechoice
                data-url="{{route('theory.leaderboard.show', ['range' => $range, 'game' => $name, 'admin' => ($adminLeaderboard ?? false) ? 1 : null])}}"
                name="{{str_slug($name)}}-leaderboard-range" type="radio" value="{{$range}}"
                class="btn-check" id="{{str_slug($name)}}-leaderboard-range-{{$range}}"
                @checked($leaderboardRange === $range) autocomplete="off">
            <label class="btn btn-sm px-3 {{$leaderboardRange === $range ? 'btn-secondary' : 'btn-white'}}" for="{{str_slug($name)}}-leaderboard-range-{{$range}}">{{$label}}</label>
        </div>
    @endforeach
</div>
