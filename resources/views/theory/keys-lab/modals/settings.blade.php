@modal(['title' => 'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.toggle', ['label' => 'Time limit', 'name' => 'timer'])
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Keys', 'name' => 'keyQualities', 'options' => $settings->getKeyQualities(), 'game' => $settings->gameName(), 'ucfirst' => true])
    @include('theory.components.settings.multichoice', ['label' => 'Clefs', 'name' => 'clefs', 'options' => $settings->getClefs(), 'game' => $settings->gameName(), 'ucfirst' => true])
    @include('theory.components.settings.accidentalsCount')
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
