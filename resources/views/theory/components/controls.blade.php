<div id="controls" class="mb-5">
  <div class="d-flex flex-column">

    @isset($instructions)
    <div class="position-relative mb-3">
      <div id="instructions" class="fw-bold text-center">
        <h6 class="m-0 text-grey" style="line-height: 1.4">{{$instructions ?? null}} </h6>
      </div>
      <div id="check" class="btn-floating w-100 invisible" style="display: none">
        <button class="btn btn-primary w-100">Check my answer</button>
      </div>
      <div id="help" class="btn-floating w-100" style="display: none">
        <button class="btn btn-blue w-100">@fa(['icon' => 'wand-magic-sparkles'])See answer</button>
      </div>
      <div id="skip" class="btn-floating w-100" style="display: none;">
        <button class="btn btn-red w-100">Next round</button>
      </div>
      <div id="play-note" class="btn-floating w-100 invisible" style="display: none">
        <button class="btn btn-blue w-100">@fa(['icon' => 'microphone'])Tap here and play the note</button>
      </div>
    </div>    

    <div id="continue" class="btn-floating w-100 mb-3" style="display: none;">
      <button class="btn btn-green w-100">Continue</button>
    </div>
    @endisset

    <div class="d-flex">
      @unless($settings->gameName() == 'Open Staff')
      <div class="btn-floating mr-1 w-100">
        <button data-bs-toggle="modal" data-bs-target="#leaderboard-{{str_slug($settings->gameName())}}-modal" class="btn btn-white w-100">@fa(['icon' => 'ranking-star'])Leaderboard</button>
      </div>
      @endunless

      <div class="btn-floating ml-1 w-100">
        <button data-bs-toggle="modal" data-bs-target="#{{str_slug($settings->gameName())}}-settings-modal" class="btn btn-white w-100">@fa(['icon' => 'gear'])Settings</button>
      </div>
    </div>
  </div>
</div>
