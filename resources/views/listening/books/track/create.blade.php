@modal(['title' => 'New track', 'id' => 'create-track-modal'])
<form id="create-track" method="POST" action="{{route('listening.books.tracks.store', $book)}}">
	@csrf

	<input type="hidden" name="audio_path" required>
	
	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])
	
	<div class="autocomplete w-100"> 
		@input(['id' => 'composer-input','placeholder' => 'Composer\'s full name', 'name' => 'composer', 'value' => old('composer')])
	</div>

	@input(['placeholder' => 'Youtube url', 'name' => 'youtube_url', 'required' => true, 'value' => old('youtube_url')])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal