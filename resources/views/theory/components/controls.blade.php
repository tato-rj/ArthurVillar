<div id="controls" class="mb-5">
  <div class="d-flex flex-column">

    @isset($instructions)
    <div class="position-relative">
      <div id="instructions" class="fw-bold text-center mb-3">
        <h6 class="m-0 text-grey-light" style="line-height: 1.4">{{$instructions ?? null}} </h6>
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
    @endisset

    <div class="d-flex mt-3">
      <div class="btn-floating mr-1 w-100">
        <button data-bs-toggle="modal" data-bs-target="#instructions-modal" class="btn btn-white w-100">@fa(['icon' => 'book'])Instructions</button>
      </div>

      <div class="btn-floating ml-1 w-100">
        <button data-bs-toggle="modal" data-bs-target="#{{str_slug($settings->gameName())}}-settings-modal" class="btn btn-white w-100">@fa(['icon' => 'gear'])Settings</button>
      </div>
    </div>
  </div>
</div>
