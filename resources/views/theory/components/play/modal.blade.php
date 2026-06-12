@modal(['id' => 'play-sound-modal'])
  <div class="text-center py-2">
    <div id="play-icon" class="mb-3">
      @fa(['icon' => 'microphone', 'mr' => 0, 'fa_size' => '4x'])
    </div>
    <div id="play-sound-status" class="fw-bold text-secondary mb-2">Listening...</div>
    <div id="play-sound-detected" class="text-grey small">Play or sing one clear note.</div>
  </div>
@endmodal
