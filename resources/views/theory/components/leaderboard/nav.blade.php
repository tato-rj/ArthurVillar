  <div class="btn-group">

    <div>
      <input singlechoice data-url="{{route('theory.leaderboard.show', ['range' => 'all', 'game' => $name])}}" name="{{str_slug($name) ?? null}}-leaderboard-range" type="radio" value="all" class="invisible position-absolute top-0 left-0" id="{{str_slug($name) ?? null}}-leaderboard-range-all" checked autocomplete="off">
      <label class="btn btn-sm px-3 btn-secondary" for="{{str_slug($name) ?? null}}-leaderboard-range-all">
        All time
        </label>
      </div>

    <div>
      <input singlechoice data-url="{{route('theory.leaderboard.show', ['range' => 'week', 'game' => $name])}}" name="{{str_slug($name) ?? null}}-leaderboard-range" type="radio" value="week" class="invisible position-absolute top-0 left-0" id="{{str_slug($name) ?? null}}-leaderboard-range-week" {{request()->range == 'week' ? 'checked' : null}} autocomplete="off">
      <label class="btn btn-sm px-3 btn-white" for="{{str_slug($name) ?? null}}-leaderboard-range-week">
        This week
        </label>
      </div>

  </div>