@modal(['title' => 'New book', 'id' => 'create-book-modal'])
<form id="create-track" method="POST" action="{{route('admin.recordings.store')}}" enctype="multipart/form-data">
	@csrf

	<input type="hidden" name="audio_path" required>
	
	@cropper

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])
	<div class="row"> 
		@input(['placeholder' => 'Composer', 'grid' => 'col', 'name' => 'composer', 'required' => true, 'value' => old('composer')])
		@input(['placeholder' => 'Artist', 'grid' => 'col', 'name' => 'artist', 'value' => old('artist')])
		@input(['placeholder' => 'Year', 'grid' => 'col', 'name' => 'composed_in', 'value' => old('composed_in')])
	</div>

	@select(['placeholder' => 'Period', 'name' => 'period_id'])
		@foreach($periods as $period)
			@option(['name' => 'period_id', 'label' => $period->name, 'value' => $period->id, 'selected' => old('period_id') == $period->id])
		@endforeach
	@endselect
	@textarea(['placeholder' => 'Description', 'name' => 'description', 'value' => old('description')])

	@input(['placeholder' => 'Source URL', 'name' => 'source_url', 'value' => old('source_url')])
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