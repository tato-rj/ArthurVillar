  <div class="mb-2">
    <label for="{{$modalID ?? null}}-speed" class="nowrap">Speed</label>
    <input type="range" name="speedIndex" class="form-range mt-2 big-thumb" data-range-labels="#speedLabels" min="0" max="2" step="1" id="{{$modalID ?? null}}-range" value="{{$settings->options('speedIndex')}}">
    <div class="d-flex justify-content-between" id="speedLabels">
      <label style="font-size: 70%" class="text-light lh-1">Normal</label>
      <label style="font-size: 70%" class="text-light lh-1 mr-2">Fast</label>
      <label style="font-size: 70%" class="text-light lh-1">Crazy</label>
    </div>
  </div>