  <div class="mb-4">
    <label for="{{$modalID ?? null}}-range" class="nowrap">Notes range</label>
    <input type="range" name="initialNoteRange" class="form-range my-2 big-thumb" data-range-labels="#initialNoteRangeLabels" min="0" max="2" step="1" id="{{$modalID ?? null}}-range" value="{{$settings->options('initialNoteRange')}}">
    <div class="d-flex justify-content-between" id="initialNoteRangeLabels">
      @foreach($settings->getInitialNoteRanges() as $index => $label)
      <label style="font-size: 70%" class="text-light lh-1 {{$loop->iteration == 2 ? 'mr-2' : null}}">{{$label}}</label>
      @endforeach
    </div>
  </div>