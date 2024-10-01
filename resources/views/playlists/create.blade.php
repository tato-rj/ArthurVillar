@modal(['title' => 'New playlist', 'id' => 'create-playlist-modal'])
<form id="create-track" method="POST" action="{{route('admin.playlists.store')}}">
	@csrf

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	@textarea(['placeholder' => 'Description', 'name' => 'description', 'value' => old('description')])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal