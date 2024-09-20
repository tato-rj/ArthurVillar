@modal(['title' => 'New book', 'id' => 'create-book-modal'])
<form id="create-track" method="POST" action="{{route('admin.recordings.store')}}" enctype="multipart/form-data">
	@csrf

	<input type="hidden" name="audio_path" required>
	
	@cropper

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])
	@input(['placeholder' => 'Composer', 'name' => 'composer', 'required' => true, 'value' => old('composer')])
	@input(['placeholder' => 'Artist', 'name' => 'artist', 'value' => old('artist')])
	@textarea(['placeholder' => 'Description', 'name' => 'description', 'value' => old('description')])

	@input(['placeholder' => 'Youtube url', 'name' => 'youtube_url', 'required' => true, 'value' => old('youtube_url')])

	<div class="row">
		@input(['placeholder' => 'Start', 'grid' => 'col', 'name' => 'start_time', 'value' => old('start_time')])
		@input(['placeholder' => 'End', 'grid' => 'col', 'name' => 'end_time', 'value' => old('end_time')])
	</div> 

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal