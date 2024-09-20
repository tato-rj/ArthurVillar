@modal(['title' => 'New book', 'id' => 'create-book-modal'])
<form id="create-track" method="POST" action="{{route('admin.recordings.store')}}" enctype="multipart/form-data">
	@csrf

	<input type="hidden" name="audio_path" required>
	
	@cropper

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])
	@input(['placeholder' => 'Composer', 'name' => 'composer', 'required' => true, 'value' => old('composer')])
	@input(['placeholder' => 'Artist', 'name' => 'artist', 'value' => old('artist')])
	@textarea(['placeholder' => 'Description', 'name' => 'description', 'value' => old('description')])

	<label class="input-file cursor-pointer w-100 form-group">
		<input style="display: none" name="audio" data-accept="mp3" type="file">
		<div class="form-control">
			<span class="filename"></span>
			<span class="default">
				@fa(['icon' => 'cloud-arrow-up'])<small>Select mp3</small>
			</span>
		</div>
	</label>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal