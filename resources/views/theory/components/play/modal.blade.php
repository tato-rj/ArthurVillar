@modal(['id' => 'play-sound-modal'])
  <div class="text-center py-2">
    <div id="play-icon" class="mb-3">
      @fa(['icon' => 'microphone', 'mr' => 0, 'fa_size' => '5x'])
    </div>
    <div id="play-sound-status" class="fw-bold text-secondary mb-2">Listening...</div>
    <div id="play-sound-detected" class="text-grey small">Play or sing the one note.</div>
    
    <div id="confirm-sound" class="btn-floating w-100 invisible mt-3" style="display: none">
      <button class="btn btn-green w-100">@fa(['icon' => 'circle-check'])Confirm</button>
    </div>

    <div id="retry" class="btn-floating w-100 invisible mt-3" style="display: none">
      <button class="btn btn-white w-100">Try again</button>
    </div>
  </div>
@endmodal
