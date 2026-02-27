<div id="controls">
  <div class="d-flex flex-column">
    <div class="position-relative">
      <div id="instructions" class="fw-bold position-absolute top-0 left-0 w-100 h-100 d-center">
        <h6 class="m-0 text-red">Tap on the staff to add a note 👆</h6>
      </div>
      <div id="check" class="btn-floating w-100 invisible">
        <button class="btn btn-primary w-100">Check my answer</button>
      </div>
      <div id="help" class="btn-floating w-100 mt-3" style="display: none">
        <button class="btn btn-blue w-100">@fa(['icon' => 'wand-magic-sparkles'])See answer</button>
      </div>
      <div id="skip" class="btn-floating w-100" style="display: none;">
        <button class="btn btn-red w-100">Next round</button>
      </div>
    </div>

    <div id="continue" class="btn-floating w-100" style="display: none;">
      <button class="btn btn-green w-100">Continue</button>
    </div>

    <div class="d-flex mt-3">
      <div class="btn-floating mr-1 w-100">
        <button data-bs-toggle="modal" data-bs-target="#instructions-modal" class="btn btn-white w-100">@fa(['icon' => 'book'])Instructions</button>
      </div>

      <div class="btn-floating ml-1 w-100">
        <button data-bs-toggle="modal" data-bs-target="#settings-modal" class="btn btn-white w-100">@fa(['icon' => 'gear'])Settings</button>
      </div>
    </div>
  </div>
</div>
