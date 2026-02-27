<div class="mb-2">
  <label class="nowrap">Triads</label>
  <div class="d-flex flex-wrap">
    @foreach($settings->getTriadQualities() as $quality)
    <div class="m-1 position-relative">
      <input name="triadQualities[]" type="checkbox" value="{{$quality}}" class="invisible position-absolute top-0 left-0" id="{{$quality}}-triad" {{in_array($quality, $settings->options('triadQualities')) ? 'checked' : null}} autocomplete="off">
      <label class="btn btn-{{in_array($quality, $settings->options('triadQualities')) ? 'secondary' : 'white'}}" for="{{$quality}}-triad">{{ucFirst($quality)}}</label>
    </div>
    @endforeach
  </div>
</div>