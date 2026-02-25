  <div class="mb-4">
    <label class="nowrap">Clefs</label>
    <div class="d-flex flex-wrap">
      @foreach($settings->getClefs() as $clef)
      <div class="m-1 position-relative">
        <input name="clefs[]" type="checkbox" value="{{$clef}}" class="invisible position-absolute top-0 left-0" id="{{$clef}}-clef-{{$modalID ?? null}}" {{in_array($clef, $settings->options('clefs')) ? 'checked' : null}} autocomplete="off">
        <label class="btn btn-{{in_array($clef, $settings->options('clefs')) ? 'secondary' : 'white'}}" for="{{$clef}}-clef-{{$modalID ?? null}}">{{ucfirst($clef)}}</label>
      </div>
      @endforeach
    </div>
  </div>