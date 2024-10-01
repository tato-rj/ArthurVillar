@modal(['title' => 'Playlists', 'id' => 'addto-playlist-'.$recording->id.'-modal'])
<form method="POST" action="{{route('admin.recordings.playlists', $recording)}}">
	@method('PATCH')
	@csrf

	@foreach($playlists as $playlist)
	<div class="form-check text-left">
	  <input class="form-check-input" name="playlists[]" {{$recording->playlists->contains($playlist) ? 'checked' : null}} type="checkbox" value="{{$playlist->id}}" id="playlist-{{$playlist->id}}-{{$recording->id}}">
	  <label class="form-check-label" for="playlist-{{$playlist->id}}-{{$recording->id}}">{{$playlist->name}}</label>
	</div>
	@endforeach
	
	@submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal