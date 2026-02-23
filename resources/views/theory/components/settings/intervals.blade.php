  <div class="mb-4">
    <label class="nowrap">Intervals</label>
    <div class="d-flex flex-wrap">
      @foreach($settings->getIntervals() as $interval)
      <div class="m-1 position-relative">
        <input name="intervals[]" type="checkbox" value="{{$interval}}" class="invisible position-absolute top-0 left-0" id="{{$modalID ?? null}}-{{$interval}}" {{in_array($interval, $settings->options('intervals')) ? 'checked' : null}} autocomplete="off">
        <label class="btn btn-{{in_array($interval, $settings->options('intervals')) ? 'secondary' : 'white'}}" for="{{$modalID ?? null}}-{{$interval}}">{{$interval}}</label>
      </div>
      @endforeach
    </div>
  </div>