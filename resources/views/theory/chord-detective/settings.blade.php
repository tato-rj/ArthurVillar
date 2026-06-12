@modal(['title' => fa('gear').'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="chord-detective-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.count', ['label' => 'Number of rounds', 'name' => 'numOfChallenges', 'min' => 2, 'max' => 12])
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Triads', 'name' => 'triadQualities', 'options' => $settings->getTriadQualities(), 'game' => $settings->gameName(), 'ucfirst' => true])
    @include('theory.components.settings.multichoice', ['label' => 'Clefs', 'name' => 'clefs', 'options' => $settings->getClefs(), 'game' => $settings->gameName(), 'ucfirst' => true])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.switch', ['label' => 'Direction', 'name' => 'direction', 'options' => ['up', 'down'], 'game' => $settings->gameName()])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Show note names', 'name' => 'showNoteNames'])
    @include('theory.components.settings.toggle', ['label' => 'Use solfege', 'name' => 'solfege'])
  @endcomponent

  @component('theory.components.settings.bonus')
    @include('theory.components.settings.toggle', ['label' => 'Time limit', 'name' => 'timer', 'icon' => 'stopwatch'])
    @include('theory.components.settings.toggle', ['label' => 'Allow inversions', 'name' => 'allowInversions', 'icon' => 'right-left'])
    @include('theory.components.settings.toggle', ['label' => 'Allow accidentals', 'name' => 'allowAccidentals', 'icon' => 'hashtag'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
