@php($recording = $row)
@switch((new \Table)->getFieldname($field))
  @case('name')
    {{$recording->name}}
    @break
  
  @case('composer')
    {{$recording->composer}}
    @break

  @case('actions')
      @include('recordings.edit')
      @component('components.table.actions', [
        'edit' => ['modal' => '#edit-recording-'.$recording->id.'-modal'],
      ])

      {{-- <a href="{{route('admin.recordings.qrcode', $recording)}}" class="btn btn-sm btn-secondary">@fa(['icon' => 'qrcode', 'mr' => 0])</a> --}}

      <a class="btn btn-sm btn-secondary" href="{{route('recordings.play', $recording)}}" target="_blank">@fa(['icon' => 'play', 'mr' => 0])</a>

      @endcomponent
      @break
@endswitch