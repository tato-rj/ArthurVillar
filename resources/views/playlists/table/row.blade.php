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

  @case('pieces_count')
    {{$playlist->pieces_count}}
    @break

  @case('actions')
      @include('components.table.actions', [
        'edit' => ['modal' => '#edit-playlist-'.$playlist->id.'-modal'],
      ])
      @include('playlists.edit', $playlist)
      @break
@endswitch