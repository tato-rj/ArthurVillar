@modal(['title' => fa('gear').' Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="chords-settings" method="GET" action="{{ route('theory.chords.play') }}">
  <div class="d-apart mb-4">
    <label class="nowrap">Number of rounds</label>
    <div class="d-center form-number">
      <button style="touch-action: manipulation;" type="button" data-direction="down" class="btn-raw text-dark">@fa(['icon' => 'minus', 'mr' => 0, 'fa_size' => 'xl'])</button>
      <input type="text" readonly name="numOfChallenges" max="12" min="2" value="{{request('numOfChallenges') ?? $settings->options('numOfChallenges')}}" class="form-control form-control-sm py-1 mx-2 text-center" style="width: 52px;">
      <button style="touch-action: manipulation;" type="button" data-direction="up" class="btn-raw text-dark">@fa(['icon' => 'plus', 'mr' => 0, 'fa_size' => 'xl'])</button>
    </div>
  </div>

  <div class="mb-4">
    <label for="{{$modalID ?? null}}-range" class="nowrap">Notes range</label>
    <input type="range" name="initialNoteRange" class="form-range m-0" data-range-labels="#initialNoteRangeLabels" min="0" max="2" step="1" id="{{$modalID ?? null}}-range" value="{{$settings->options('initialNoteRange')}}">
    <div class="d-flex justify-content-between" id="initialNoteRangeLabels">
      @foreach($settings->getInitialNoteRanges() as $index => $label)
      <label style="font-size: 70%" class="text-light lh-1">{{$label}}</label>
      @endforeach
    </div>
  </div>
  
  <div class="mb-4">
    <label class="nowrap">Triads</label>
    <div class="d-flex flex-wrap">
      @foreach($settings->getTriadQualities() as $quality)
      <div class="m-1 position-relative">
        <input name="triadQualities[]" type="checkbox" value="{{$quality}}" class="invisible position-absolute top-0 left-0" id="{{$quality}}-triad" {{in_array($quality, $settings->options('triadQualities')) ? 'checked' : null}} autocomplete="off">
        <label class="btn btn-{{in_array($quality, $settings->options('triadQualities')) ? 'secondary' : 'white'}}" for="{{$quality}}-triad">{{ucFirst($quality)}}</label>
      </div>
      @endforeach
    </div>
  </div>

  <div class="mb-4">
    <label class="nowrap">Clefs</label>
    <div class="d-flex flex-wrap">
      @foreach($settings->getClefs() as $clef)
      <div class="m-1 position-relative">
        <input name="clefs[]" type="checkbox" value="{{$clef}}" class="invisible position-absolute top-0 left-0" id="{{$clef}}-clef-{{$modalID ?? null}}" {{in_array($clef, $settings->options('clefs')) ? 'checked' : null}} autocomplete="off">
        <label class="btn btn-{{in_array($clef, $settings->options('clefs')) ? 'secondary' : 'white'}}" for="{{$clef}}-clef-{{$modalID ?? null}}">{{ucfirst($clef)}}</label>
      </div>
      @endforeach
    </div>
  </div>

  <div class="d-apart mb-4">
    <label>Sound effects</label>
    @toggle(['name' => 'sound', 'on' => $settings->options('sound')])
  </div>

  <div class="d-apart mb-4">
    <label>Show letter names</label>
    @toggle(['name' => 'showLetterNames', 'on' => $settings->options('showLetterNames')])
  </div>

  <div class="d-apart mb-4">
    <label>Accidentals on the initial note</label>
    @toggle(['name' => 'allowInitialAccidentals', 'on' => $settings->options('allowInitialAccidentals')])
  </div>

  <div class="d-apart mb-4">
    <label>Initial note is always the root</label>
    @toggle(['name' => 'initialRoot', 'on' => $settings->options('initialRoot')])
  </div>

  <div class="d-apart mb-4">
    <label>Play with 7th chords</label>
    @toggle(['name' => 'only7thChords', 'on' => $settings->options('only7thChords')])
  </div>

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
