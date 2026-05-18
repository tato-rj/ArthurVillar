  <div class="btn-group">

    <div>
      <input singlechoice data-url="{{route('admin.leaderboard.index', ['range' => 'all'])}}" name="leaderboard-range" type="radio" value="all" class="invisible position-absolute top-0 left-0" id="leaderboard-range-all" {{! request()->has('range') || request()->range == 'all' ? 'checked' : null}} autocomplete="off">
      <label class="btn btn-sm px-3 btn-{{! request()->has('range') || request()->range == 'all' ? 'secondary' : 'white'}}" for="leaderboard-range-all">
        All time
        </label>
      </div>

    <div>
      <input singlechoice data-url="{{route('admin.leaderboard.index', ['range' => 'week'])}}" name="leaderboard-range" type="radio" value="week" class="invisible position-absolute top-0 left-0" id="leaderboard-range-week" {{request()->range == 'week' ? 'checked' : null}} autocomplete="off">
      <label class="btn btn-sm px-3 btn-{{request()->range == 'week' ? 'secondary' : 'white'}}" for="leaderboard-range-week">
        This week
        </label>
      </div>

  </div>