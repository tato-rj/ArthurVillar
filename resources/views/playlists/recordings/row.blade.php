@php($recording = $row)
@switch((new \Table)->getFieldname($field))
  @case('name')
    <span style="width: 12px; height: 12px;" class="mr-2 d-inline-block rounded-circle bg-{{$recording->period->color}}"></span>{{$recording->name}}
    @break
  
  @case('composer')
    {{$recording->composer->name}}
    @break

  @case('period')
    {{$recording->period->name}}
    @break

  @case('ensemble_type')
    {{ucfirst($recording->ensemble_type)}}
    @break

  @case('actions')
      @include('recordings.edit.playlists')
      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#addto-playlist-{{$recording->id}}-modal">@fa(['icon' => 'list', 'mr' => 0])</button>
      @break
@endswitch