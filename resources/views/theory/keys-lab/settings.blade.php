@modal(['title' => fa('gear').'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.count', ['label' => 'Number of rounds', 'name' => 'numOfChallenges', 'min' => 2, 'max' => 12])
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Keys (when modes are off)', 'name' => 'keyQualities', 'options' => $settings->getKeyQualities(), 'game' => $settings->gameName(), 'ucfirst' => true])
    @include('theory.components.settings.multichoice', ['label' => 'Clefs', 'name' => 'clefs', 'options' => $settings->getClefs(), 'game' => $settings->gameName(), 'ucfirst' => true])
    @include('theory.components.settings.value-range', [
      'label' => 'Maximum accidentals in key signature',
      'name' => 'numberOfAccidentals',
      'id' => 'keys-lab-max-accidentals',
      'min' => 1,
      'max' => 7,
    ])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
  @endcomponent

  @component('theory.components.settings.bonus')
    @include('theory.components.settings.toggle', ['label' => 'Time limit', 'name' => 'timer', 'icon' => 'stopwatch'])
    @include('theory.components.settings.toggle', ['label' => 'Greek Modes', 'name' => 'modes', 'icon' => 'music'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
