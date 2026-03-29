@modal(['title' => 'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Clefs', 'name' => 'clefs', 'options' => $settings->getClefs(), 'game' => $settings->gameName(), 'ucfirst' => true, 'singlechoice' => true])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Show note names', 'name' => 'showNoteNames'])
    @include('theory.components.settings.toggle', ['label' => 'Use solfege', 'name' => 'solfege'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
