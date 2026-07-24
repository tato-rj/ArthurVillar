<div class="modal fade {{$class ?? null}}-modal {{iftrue($modalcenter ?? null, 'd-center')}} {{iftrue($autoshow ?? null, 'modal-autoshow')}}"
  @isset($data)
  @foreach($data as $type => $action)
  data-{{$type}}="{{$action}}"
  @endforeach
  @endisset
 id="{{$id}}" style="white-space: initial; cursor: default;">
  <div class="modal-dialog modal-{{$size ?? null}}">
    <div class="modal-content rounded border-0">

      @isset($header)
      <div class="modal-header border-0 p-4 align-items-start">
        <div class="text-truncate">{!! $header !!}</div>

          <button type="button" class="btn-close btn-raw text-dark" style="width: inherit; height: inherit;" data-bs-dismiss="modal" aria-label="Close">@fa(['icon' => 'times', 'mr' => 0])</button>
      </div>
      @else
      <div class="modal-header border-0 pb-0 justify-content-between">
        <h4 class="modal-title text-secondary no-stroke text-nowrap text-truncate">{!!$title ?? null!!}</h4>

        <div class="d-flex justify-content-end align-items-center">
          <div id="header-buttons">
            {!!$headerButtons ?? null!!}
          </div>
          <button type="button" class="btn-close btn-raw" style="width: inherit; height: inherit;" data-bs-dismiss="modal" aria-label="Close">@fa(['icon' => 'times', 'mr' => 0])</button>
        </div>
      </div>
      @endisset

      <div class="modal-body {{! isset($title) ? 'pt-0' : null}} {{iftrue($bodyFullWidth ?? null, 'px-0')}}">
        {{$slot}}
      </div>

      @isset($footer)
      <div class="modal-footer">
        {{$footer}}
      </div>
      @endisset

    </div>
  </div>
</div>