@modal(['title' => fa('gear').'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Clefs', 'name' => 'clefs', 'options' => $settings->getClefs(), 'game' => $settings->gameName(), 'ucfirst' => true, 'singlechoice' => true])
    @include('theory.components.settings.count', ['label' => 'Number of voices', 'name' => 'numOfVoices', 'min' => 1, 'max' => 4])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Use solfege', 'name' => 'solfege'])
    @include('theory.components.settings.toggle', ['label' => 'Show label on tap', 'name' => 'showLabelOnTap'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Apply changes</button>
</form>
@endmodal
