
@modal(['title' => fa('gear').'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.count', ['label' => 'Number of rounds', 'name' => 'numOfChallenges', 'min' => 2, 'max' => 12])
    @include('theory.components.settings.count', ['label' => 'Number of measures', 'name' => 'numOfMeasures', 'min' => 1, 'max' => 8])
    <div class="mb-3">
      <div class="d-apart">
        <label for="beat-hero-bpm">Metronome</label>
        <output id="beat-hero-bpm-output" for="beat-hero-bpm" class="fw-bold">{{$settings->options('bpm')}} BPM</output>
      </div>
      <input
        id="beat-hero-bpm"
        type="range"
        name="bpm"
        class="form-range mt-2 big-thumb"
        min="40"
        max="200"
        step="5"
        value="{{$settings->options('bpm')}}"
        data-beat-hero-range-output="#beat-hero-bpm-output"
        data-output-suffix=" BPM">
      <div class="d-flex justify-content-between small text-light">
        <span>40 BPM</span>
        <span>200 BPM</span>
      </div>
    </div>
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Time Signatures', 'name' => 'timeSignatures', 'options' => $settings->getTimeSignatures(), 'game' => $settings->gameName()])

    @include('theory.components.settings.multichoice', ['label' => 'Notes', 'name' => 'notesValues', 'options' => $settings->getNotesValues(), 'game' => $settings->gameName()])
    @include('theory.components.settings.toggle', ['label' => 'Include rests', 'name' => 'includeRests'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Use microphone to tap', 'name' => 'useVoice'])
    <div class="mb-3">
      <div class="d-apart">
        <label for="beat-hero-mic-sensitivity">Microphone sensitivity</label>
        <output id="beat-hero-mic-sensitivity-output" for="beat-hero-mic-sensitivity" class="fw-bold">{{$settings->options('micSensitivity')}}%</output>
      </div>
      <input
        id="beat-hero-mic-sensitivity"
        type="range"
        name="micSensitivity"
        class="form-range mt-2 big-thumb"
        min="0"
        max="100"
        step="5"
        value="{{$settings->options('micSensitivity')}}"
        data-beat-hero-range-output="#beat-hero-mic-sensitivity-output"
        data-output-suffix="%">
      <div class="d-flex justify-content-between small text-light">
        <span>Low sensitivity</span>
        <span>High sensitivity</span>
      </div>
    </div>
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
