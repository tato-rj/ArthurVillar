@modal(['title' => 'Game settings', 'id' => 'settings-modal'])

<div class="text-center mb-3">
  <div class="btn-group settings-menu">
    <button type="button" class="btn btn-sm btn-secondary" data-mode="settings-basic">Basic</button>
    <button type="button" class="btn btn-sm btn-outline-secondary" data-mode="settings-advanced">Advanced</button>
  </div>
</div>

<form id="intervals-settings" method="GET" action="{{ route('theory.intervals.play') }}">

  @include('theory.intervals.modals.settings.general')

  <div id="settings-basic">
    @include('theory.intervals.modals.settings.basic')
  </div>

  <div id="settings-advanced" style="display:none">
  	@include('theory.intervals.modals.settings.advanced')
  </div>

  <div class="mt-4">
    <button type="submit" class="btn btn-primary w-100">{{ $btnLabel }}</button>
  </div>
</form>

@endmodal


{{-- @modal(['title' => 'Game settings', 'id' => 'settings-modal'])
<div class="text-center mb-3">
  <div class="btn-group settings-menu">
    <button type="button" 
            class="btn btn-sm btn-secondary" 
            data-target="#settings-basic"
            >Basic</button>

    <button type="button" 
            class="btn btn-sm btn-outline-secondary" 
            data-target="#settings-advanced" 
            >Advanced</button>
  </div>
</div>

@include('theory.intervals.modals.settings.basic')
@include('theory.intervals.modals.settings.advanced')
@endmodal --}}