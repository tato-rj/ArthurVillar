@modal(['title' => 'Game settings', 'id' => $modalID ?? 'settings-modal'])
<form id="intervals-settings" method="GET" action="{{ route('theory.intervals.play') }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.timer')
    @include('theory.components.settings.practice')
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.range')
    @include('theory.components.settings.intervals')
    @include('theory.components.settings.clefs')
    <hr class="opacity-1">
    @include('theory.components.settings.accidentals')
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.sound')
    @include('theory.components.settings.lettername')
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
