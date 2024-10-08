@modal(['title' => 'Edit playlist', 'id' => 'edit-playlist-'.$playlist->id.'-modal'])
<div class="mb-4 pb-4" style="border-bottom: 4px dotted lightgrey;">
	<form id="create-track" method="POST" action="{{route('admin.playlists.update', $playlist)}}">
		@method('PATCH')
		@csrf

		@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $playlist->name])

		@textarea(['label' => 'Description', 'name' => 'description', 'value' => $playlist->description])

		@submit(['label' => 'Save changes', 'theme' => 'primary'])
	</form>
</div>

<div>
	<form id="create-track" method="POST" action="{{route('admin.playlists.secret', $playlist)}}">
		@method('PATCH')
		@csrf

		@input(['label' => 'Secret', 'disabled' => true, 'value' => $playlist->secret])

		@submit(['label' => 'Renew secret', 'theme' => 'primary'])
	</form>
</div>
@endmodal