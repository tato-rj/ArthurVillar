<div
  id="{{$id ?? 'game-countdown'}}"
  class="game-countdown{{!empty($screen) ? ' game-countdown--screen' : ''}}"
  hidden>
  <div class="game-countdown__center">
    @isset($startLabel)
      <button type="button" class="btn btn-primary btn-lg" data-game-countdown-start>{{$startLabel}}</button>
    @endisset
    <h1
      class="game-countdown__value"
      data-game-countdown-value
      role="status"
      aria-live="polite"
      aria-atomic="true"
      hidden></h1>
  </div>
</div>
