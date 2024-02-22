@modal(['title' => 'Edit track', 'id' => 'edit-track-'.$track->id.'-modal'])
<form id="edit-track" method="POST" action="{{route('listening.books.tracks.update', compact(['book', 'track']))}}">
	@csrf
	@method('PATCH')
	
	<input type="hidden" name="audio_path" required value="{{$track->audio_path}}">
	
	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => $track->name])
	
	@input(['placeholder' => 'Composer', 'name' => 'composer', 'value' => $track->composer])

	@input(['placeholder' => 'Youtube url', 'name' => 'youtube_url', 'required' => true, 'value' => old('youtube_url')])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>

<div class="text-center pt-3 mt-3" style="border-top: 4px dotted grey">
	@delete(['action' => route('listening.books.tracks.destroy', compact(['book', 'track'])), 'label' => 'Delete this track'])
</div>
@endmodal