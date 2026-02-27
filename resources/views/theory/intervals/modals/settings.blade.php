@modal(['title' => fa('gear').' Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="intervals-settings" method="GET" action="{{ route('theory.intervals.play') }}">
  {{-- TYPE OF GAME!! MAKE A SWITCH TO TOGGLE BETWEEN EACH OPTION --}}
  @include('theory.components.settings.rounds')
  @include('theory.components.settings.timer')
  @include('theory.components.settings.practice')

  @include('theory.components.settings.range')
  @include('theory.components.settings.intervals')
  @include('theory.components.settings.clefs')
  @include('theory.components.settings.sound')
  @include('theory.components.settings.lettername')
  @include('theory.components.settings.accidentals')


  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
