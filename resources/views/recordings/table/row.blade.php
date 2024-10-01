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

  @case('composed_in')
    {{$recording->composed_in}}
    @break

  @case('actions')
      @component('components.table.actions', [
        'edit' => ['href' => route('admin.recordings.edit', $recording)],
      ])

      {{-- <a href="{{route('admin.recordings.qrcode', $recording)}}" class="btn btn-sm btn-secondary">@fa(['icon' => 'qrcode', 'mr' => 0])</a> --}}
      {{-- <a class="btn btn-sm btn-secondary" href="{{$recording->playUrl()}}" target="_blank">@fa(['icon' => 'play', 'mr' => 0])</a> --}}
      
      @include('recordings.play.modal')
      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#play-{{$recording->id}}-modal">@fa(['icon' => 'play', 'mr' => 0])</button>

      @include('recordings.edit.playlists')
      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#addto-playlist-{{$recording->id}}-modal">@fa(['icon' => 'list', 'mr' => 0])</button>
      
      @endcomponent
      @break
@endswitch