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
    {{$playlist->recordings->count()}}
    @break

  @case('actions')
      @component('components.table.actions', [
        'edit' => ['modal' => '#edit-playlist-'.$playlist->id.'-modal'],
      ])

      @if($playlist->recordings()->exists())
      <a class="btn btn-sm btn-secondary" target="_blank" href="{{route('listening.url', [
        'recording' => $playlist->recordings->first(),
        'playlist_id' => $playlist->id,
      ])}}">@fa(['icon' => 'play', 'mr' => 0])</a>
      @endif

      <a class="btn btn-sm btn-secondary" href="{{route('listening.playlists.recordings', $playlist)}}">@fa(['icon' => 'list', 'mr' => 0])</a>
      @endcomponent
      @include('listening.playlists.edit', $playlist)
      @break
@endswitch
