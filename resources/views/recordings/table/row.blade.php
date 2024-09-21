@php($recording = $row)
@switch((new \Table)->getFieldname($field))
  @case('name')
    <span style="width: 16px; height: 16px; transform: translateY(2px);" class="mr-1 d-inline-block rounded-circle bg-{{$recording->period->color}}"></span>{{$recording->name}}
    @break
  
  @case('composer')
    {{$recording->composer}}
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

      <a class="btn btn-sm btn-secondary" href="{{$recording->playUrl()}}" target="_blank">@fa(['icon' => 'play', 'mr' => 0])</a>

      @endcomponent
      @break
@endswitch