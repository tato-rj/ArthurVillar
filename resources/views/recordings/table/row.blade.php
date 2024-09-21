@php($recording = $row)
@switch((new \Table)->getFieldname($field))
  @case('name')
    {{$recording->name}}
    @break
  
  @case('composer')
    {{$recording->composer}}
    @break
  
  @case('period')
    {{$recording->period->name}}
    @break

  @case('actions')
      @component('components.table.actions', [
        'edit' => ['href' => route('admin.recordings.edit', $recording)],
      ])

      {{-- <a href="{{route('admin.recordings.qrcode', $recording)}}" class="btn btn-sm btn-secondary">@fa(['icon' => 'qrcode', 'mr' => 0])</a> --}}

      <a class="btn btn-sm btn-secondary" href="{{$recording->playUrl()}}" target="_blank">@fa(['icon' => 'play', 'mr' => 0])</a>

      @endcomponent
      @break
@endswitch