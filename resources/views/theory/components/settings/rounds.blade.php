<div class="d-apart mb-4">
  <label class="nowrap">Number of rounds</label>
  <div class="d-center form-number">
    <button style="touch-action: manipulation;" type="button" data-direction="down" class="btn-raw text-dark">@fa(['icon' => 'minus', 'mr' => 0, 'fa_size' => 'xl'])</button>
    <input type="text" readonly name="numOfChallenges" max="12" min="2" value="{{request('numOfChallenges') ?? $settings->options('numOfChallenges')}}" class="form-control form-control-sm py-1 mx-2 text-center border-light" style="width: 52px;">
    <button style="touch-action: manipulation;" type="button" data-direction="up" class="btn-raw text-dark">@fa(['icon' => 'plus', 'mr' => 0, 'fa_size' => 'xl'])</button>
  </div>
</div>