@modal(['title' => fa('gear').' Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="chords-settings" method="GET" action="{{ route('theory.chords.play') }}">
  @include('theory.components.settings.rounds')
  @include('theory.components.settings.range')
  
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
