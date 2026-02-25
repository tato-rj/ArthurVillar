@modal(['title' => fa('gear').' Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="intervals-settings" method="GET" action="{{ route('theory.dictation.play') }}">
  @include('theory.components.settings.rounds')
  @include('theory.components.settings.range')
  @include('theory.components.settings.intervals')
  @include('theory.components.settings.clefs')

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

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
