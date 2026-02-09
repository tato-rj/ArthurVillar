<div class="d-flex flex-column">
  <div id="check" class="btn-floating w-100">
    <button class="btn btn-primary w-100">Check</button>
  </div>

  <div id="continue" class="btn-floating w-100" style="display: none;">
    <button class="btn btn-green w-100">Continue</button>
  </div>

  <div class="d-flex mt-3">
    <div class="btn-floating mr-1 w-100">
      <button class="btn btn-white w-100">@fa(['icon' => 'question-circle'])Help</button>
    </div>

    <div class="btn-floating ml-1 w-100">
      <button data-bs-toggle="modal" data-bs-target="#settings-modal" class="btn btn-white w-100">@fa(['icon' => 'gear'])Settings</button>
    </div>
  </div>
</div>

@include('theory.intervals.modals.settings')