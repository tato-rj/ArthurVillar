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
        'edit' => ['modal' => '#edit-playlist-'.$playlist->id.'-modal'],
      ])
      @include('playlists.edit', $playlist)

      <a class="btn btn-sm btn-secondary" href="{{route('admin.playlists.charts', $playlist)}}">@fa(['icon' => 'chart-pie', 'mr' => 0])</a>
      @endcomponent
      @break
@endswitch