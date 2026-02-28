@modal(['title' => 'Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="chords-settings" method="GET" action="{{ route('theory.chords.play') }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.timer')
    @include('theory.components.settings.practice')
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.triads')
    @include('theory.components.settings.clefs')
    <hr class="opacity-1">
    @include('theory.components.settings.accidentals')
    @include('theory.components.settings.rootnote')
    @include('theory.components.settings.7thchords')
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.sound')
    @include('theory.components.settings.lettername')
    @include('theory.components.settings.range')
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
