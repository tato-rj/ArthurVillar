@modal(['title' => 'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="chords-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.toggle', ['label' => 'Time limit', 'name' => 'timer'])
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.triads')
    @include('theory.components.settings.clefs')
    <hr class="opacity-1">
    @include('theory.components.settings.toggle', ['label' => 'Allow accidentals', 'name' => 'allowAccidentals'])
    @include('theory.components.settings.toggle', ['label' => 'Initial note is always the root', 'name' => 'initialRoot'])
    @include('theory.components.settings.toggle', ['label' => 'Play with 7th chords', 'name' => 'only7thChords'])
    @include('theory.components.settings.toggle', ['label' => 'Specify a direction', 'name' => 'strictDirection'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Show note names', 'name' => 'showNoteNames'])
    @include('theory.components.settings.toggle', ['label' => 'Use solfege', 'name' => 'solfege'])
    @include('theory.components.settings.range')
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
