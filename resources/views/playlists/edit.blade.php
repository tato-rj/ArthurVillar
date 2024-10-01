@modal(['title' => 'Edit playlist', 'id' => 'edit-playlist-'.$playlist->id.'-modal'])
<form id="create-track" method="POST" action="{{route('admin.playlists.update', $playlist)}}">
	@method('PATCH')
	@csrf

	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $playlist->name])

	@textarea(['label' => 'Description', 'name' => 'description', 'value' => $playlist->description])

	@submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal