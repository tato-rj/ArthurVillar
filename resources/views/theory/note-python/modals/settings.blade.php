@modal(['title' => 'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.speed')
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Intervals', 'name' => 'intervals', 'options' => $settings->getIntervals(), 'game' => $settings->gameName()])
    <hr class="opacity-1">
    @include('theory.components.settings.toggle', ['label' => 'Allow accidentals', 'name' => 'allowAccidentals'])
    @include('theory.components.settings.toggle', ['label' => 'Specify a direction', 'name' => 'strictDirection'])
    @include('theory.components.settings.toggle', ['label' => 'Show bombs', 'name' => 'showBombs'])
    @include('theory.components.settings.toggle', ['label' => 'Real walls', 'name' => 'realWalls'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Use solfege', 'name' => 'solfege'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
