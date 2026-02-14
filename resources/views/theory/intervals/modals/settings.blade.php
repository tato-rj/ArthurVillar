@modal(['title' => fa('gear').' Game settings', 'id' => 'intervals-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ route('theory.intervals.play') }}">
  <div class="d-apart mb-4">
    <label class="nowrap">Number of rounds</label>
    <div class="d-center form-number">
      <button style="touch-action: manipulation;" type="button" data-direction="down" class="btn-raw text-dark">@fa(['icon' => 'minus', 'mr' => 0, 'fa_size' => 'xl'])</button>
      <input type="text" readonly name="numOfChallenges" max="12" min="2" value="{{request('numOfChallenges') ?? $challenge->options('numOfChallenges')}}" class="form-control form-control-sm py-1 mx-2 text-center" style="width: 52px;">
      <button style="touch-action: manipulation;" type="button" data-direction="up" class="btn-raw text-dark">@fa(['icon' => 'plus', 'mr' => 0, 'fa_size' => 'xl'])</button>
    </div>
  </div>

  <div class="mb-4">
    <label class="nowrap">Intervals</label>
    <div class="d-flex flex-wrap">
      @foreach($challenge->getIntervals() as $interval)
      <div class="m-1 position-relative">
        <input name="intervals[]" type="checkbox" value="{{$interval}}" class="invisible position-absolute top-0 left-0" id="{{$interval}}" {{in_array($interval, $challenge->options('intervals')) ? 'checked' : null}} autocomplete="off">
        <label class="btn btn-{{in_array($interval, $challenge->options('intervals')) ? 'secondary' : 'white'}}" for="{{$interval}}">{{$interval}}</label>
      </div>
      @endforeach
    </div>
  </div>

  <div class="mb-4">
    <label class="nowrap">Clefs</label>
    <div class="d-flex flex-wrap">
      @foreach($challenge->getClefs() as $clef)
      <div class="m-1 position-relative">
        <input name="clefs[]" type="checkbox" value="{{$clef}}" class="invisible position-absolute top-0 left-0" id="{{$clef}}-clef" {{in_array($clef, $challenge->options('clefs')) ? 'checked' : null}} autocomplete="off">
        <label class="btn btn-{{in_array($clef, $challenge->options('clefs')) ? 'secondary' : 'white'}}" for="{{$clef}}-clef">{{ucfirst($clef)}}</label>
      </div>
      @endforeach
    </div>
  </div>

  <div class="d-apart mb-4">
    <label>Sound effects</label>
    @toggle(['name' => 'sound', 'on' => $challenge->options('sound')])
  </div>

  <div class="d-apart mb-4">
    <label>Show letter names</label>
    @toggle(['name' => 'showLetterNames', 'on' => $challenge->options('showLetterNames')])
  </div>

  <div class="d-apart mb-4">
    <label>Accidentals on the initial note</label>
    @toggle(['name' => 'allowInitialAccidentals', 'on' => $challenge->options('allowInitialAccidentals')])
  </div>

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
