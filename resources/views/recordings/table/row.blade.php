@php($recording = $row)
@switch((new \Table)->getFieldname($field))
  @case('name')
    <span style="width: 12px; height: 12px;" class="mr-2 d-inline-block rounded-circle bg-{{$recording->period->color}}"></span>{{$recording->name}}
    @break
  
  @case('composer')
    {{$recording->composer->name}}
    @break

  @case('ensemble_type')
    {{ucfirst($recording->ensemble_type)}}
    @break
  
  @case('playlists_count')
    {{$recording->playlists_count}}
    @break

  @case('actions')
      @component('components.table.actions', [
        'edit' => ['href' => route('admin.recordings.edit', $recording)],
      ])

      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#play-{{$recording->id}}-modal">@fa(['icon' => 'play', 'mr' => 0])</button>
      
      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#addto-playlist-{{$recording->id}}-modal">@fa(['icon' => 'list', 'mr' => 0])</button>
      
      @endcomponent

      @include('recordings.edit.playlists')
      @include('recordings.play.modal')
      @break
@endswitch