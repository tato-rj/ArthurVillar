<div id="overlay" style="display: none;" class="position-fixed top-0 right-0 w-100 h-100vh">
  <div class="d-center h-100">
    <div class="text-center">
      <div id="overlay-success" style="font-size: 3rem; display: none;">
        <div class="text-green animate__animated animate__rubberBand animate__slow">
          @fa(['icon' => 'check', 'mr' => 0])
        </div>
      </div>
      <div id="overlay-spinner" class="spinner-border text-secondary mb-3" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h5 id="overlay-feedback">Downloading and converting the video</h5>
    </div>
  </div>
</div>