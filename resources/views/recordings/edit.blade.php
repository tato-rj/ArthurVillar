@modal(['title' => 'Edit recording', 'id' => 'edit-recording-'.$recording->id.'-modal'])
<form id="create-track" method="POST" action="{{route('admin.recordings.store')}}" enctype="multipart/form-data">
	@csrf

	<input type="hidden" name="audio_path" required>
	
	@cropper(['model' => $recording])

	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $recording->name])
	@input(['label' => 'Composer', 'name' => 'composer', 'required' => true, 'value' => $recording->composer])
	@input(['label' => 'Artist', 'name' => 'artist', 'value' => $recording->artist])
	@textarea(['label' => 'Description', 'name' => 'description', 'value' => $recording->description])

	@submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>

<div class="text-center mt-3 pt-3" style="border-top: 4px dotted grey">
	@delete(['action' => route('admin.recordings.destroy', $recording), 'label' => 'Delete this recording'])
</div>
@endmodal