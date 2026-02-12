@modal(['title' => 'Game settings', 'id' => 'settings-modal'])
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
@endmodal