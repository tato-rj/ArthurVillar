@if(local())
@modal(['title' => fa('gear').'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.rounds')
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Time Signatures', 'name' => 'timeSignatures', 'options' => $settings->getTimeSignatures(), 'game' => $settings->gameName()])

    @include('theory.components.settings.multichoice', ['label' => 'Notes', 'name' => 'notesValues', 'options' => $settings->getNotesValues(), 'game' => $settings->gameName()])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
@endif