@modal(['title' => 'New recording', 'id' => 'create-recording-modal'])
<form id="create-track" method="POST" action="{{route('listening.recordings.store')}}" enctype="multipart/form-data">
	@csrf
	
	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	<div class="row"> 
		@select(['placeholder' => 'Ensemble type', 'grid' => 'col', 'name' => 'ensemble_type'])
			@foreach($ensembles as $ensemble)
				@option(['name' => 'ensemble_type', 'label' => ucfirst($ensemble), 'value' => $ensemble, 'selected' => old('ensemble_type') == $ensemble])
			@endforeach
		@endselect
		@select(['placeholder' => 'Composer', 'grid' => 'col', 'name' => 'composer_id'])
			@foreach($periods as $period)
			<optgroup label="{{$period->name}}">
				@foreach($period->composers as $composer)
				@option(['name' => 'composer_id', 'label' => $composer->name, 'value' => $composer->id, 'selected' => old('composer_id') == $composer->id])
				@endforeach
			</optgroup>
			@endforeach
		@endselect
	</div>
	<div class="row"> 
		@select(['placeholder' => 'Period', 'grid' => 'col', 'name' => 'period_id'])
			@foreach($periods as $period)
				@option(['name' => 'period_id', 'label' => $period->name, 'value' => $period->id, 'selected' => old('period_id') == $period->id])
			@endforeach
		@endselect
		@input(['placeholder' => 'Artist', 'grid' => 'col', 'name' => 'artist', 'value' => old('artist')])
		@input(['placeholder' => 'Year', 'type' => 'number', 'min' => 1400, 'grid' => 'col', 'name' => 'composed_in', 'value' => old('composed_in')])
	</div>

    <div id="quill-event-edit" data-name="description" class="mb-4">
        {!!old('description')!!}
    </div>
    <textarea style="display: none" name="description">{!!old('description')!!}</textarea>

	@input(['placeholder' => 'Youtube url', 'name' => 'youtube_url', 'required' => true, 'value' => old('youtube_url')])

	<div class="row">
		@input(['placeholder' => 'Start', 'grid' => 'col', 'name' => 'start_time', 'value' => old('start_time')])
		@input(['placeholder' => 'End', 'grid' => 'col', 'name' => 'end_time', 'value' => old('end_time')])
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
