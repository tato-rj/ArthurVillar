@modal(['title' => 'Select playlist', 'id' => 'play-'.$recording->id.'-modal'])
<form method="POST" action="{{route('recordings.url', $recording)}}">
	@csrf

	@select(['placeholder' => 'Include a playlist?', 'grid' => 'col', 'name' => 'playlist_id'])
		@foreach($recording->playlists as $playlist)
		@option(['name' => 'playlist_id', 'label' => $playlist->name, 'value' => $playlist->id])
		@endforeach
	@endselect

	@submit(['label' => 'Go to player', 'theme' => 'primary'])
</form>
@endmodal