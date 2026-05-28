@if(local())
@modal(['title' => fa('gear').'Game settings', 'id' => str_slug($settings->gameName()).'-settings-modal'])
<form id="intervals-settings" method="GET" action="{{ $settings->gameUrl() }}">
  @component('theory.components.settings.section', ['title' => 'SETUP'])
    @include('theory.components.settings.count', ['label' => 'Number of rounds', 'name' => 'numOfChallenges', 'min' => 2, 'max' => 12])
    @include('theory.components.settings.count', ['label' => 'Number of measures', 'name' => 'numOfMeasures', 'min' => 1, 'max' => 8])
    @include('theory.components.settings.toggle', ['label' => 'Practice mode', 'name' => 'practiceMode'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'MATERIAL'])
    @include('theory.components.settings.multichoice', ['label' => 'Time Signatures', 'name' => 'timeSignatures', 'options' => $settings->getTimeSignatures(), 'game' => $settings->gameName()])

    @include('theory.components.settings.multichoice', ['label' => 'Notes', 'name' => 'notesValues', 'options' => $settings->getNotesValues(), 'game' => $settings->gameName()])
    @include('theory.components.settings.toggle', ['label' => 'Include rests', 'name' => 'includeRests'])
  @endcomponent

  @component('theory.components.settings.section', ['title' => 'PREFERENCES'])
    @include('theory.components.settings.toggle', ['label' => 'Sound effects', 'name' => 'sound'])
    @include('theory.components.settings.toggle', ['label' => 'Use voice', 'name' => 'useVoice'])
  @endcomponent

  <button type="submit" class="btn btn-primary w-100">Start new game</button>
</form>
@endmodal
@endif
