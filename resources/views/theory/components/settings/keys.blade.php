<div class="mb-2">
  <label class="nowrap">Keys</label>
  <div class="d-flex flex-wrap">
    @foreach($settings->getKeyQualities() as $quality)
    <div class="m-1 position-relative">
      <input name="keyQualities[]" type="checkbox" value="{{$quality}}" class="invisible position-absolute top-0 left-0" id="{{$quality}}-key" {{in_array($quality, $settings->options('keyQualities')) ? 'checked' : null}} autocomplete="off">
      <label class="btn btn-{{in_array($quality, $settings->options('keyQualities')) ? 'secondary' : 'white'}}" for="{{$quality}}-key">{{ucFirst($quality)}}</label>
    </div>
    @endforeach
  </div>
</div>