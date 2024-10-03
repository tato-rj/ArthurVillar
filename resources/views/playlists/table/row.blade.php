@php($playlist = $row)
@switch((new \Table)->getFieldname($field))
  @case('created_at')
    {{$playlist->created_at->toFormattedDateString()}}
    @break

  @case('name')
    {{$playlist->name}}
    @break
  
  @case('description')
    {{$playlist->description}}
    @break

  @case('recordings_count')
    {{$playlist->recordings_count}}
    @break

  @case('actions')
      @component('components.table.actions', [
        'edit' => ['href' => route('admin.playlists.edit', $playlist)],
      ])
      @endcomponent
      @break
@endswitch