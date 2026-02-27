@modal(['title' => fa('gear').' Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="intervals-settings" method="GET" action="{{ route('theory.intervals.play') }}">
  @include('theory.components.settings.rounds')
  @include('theory.components.settings.range')
  @include('theory.components.settings.intervals')
  @include('theory.components.settings.clefs')
  @include('theory.components.settings.practice')
  @include('theory.components.settings.sound')
  @include('theory.components.settings.lettername')
  @include('theory.components.settings.accidentals')
  @include('theory.components.settings.timer')

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
