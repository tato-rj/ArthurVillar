@modal(['title' => 'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.toggle', ['label' => 'Time limit', 'name' => 'timer'])
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Clefs', 'name' => 'clefs', 'options' => $settings->getClefs(), 'game' => $settings->gameName(), 'ucfirst' => true])
    @include('theory.components.settings.range')
    <hr class="opacity-1">
    @include('theory.components.settings.toggle', ['label' => 'Allow accidentals', 'name' => 'allowAccidentals'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Show note names', 'name' => 'showNoteNames'])
    @include('theory.components.settings.toggle', ['label' => 'Use solfege', 'name' => 'solfege'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
