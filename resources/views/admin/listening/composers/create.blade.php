@modal(['title' => 'New composer', 'id' => 'create-composer-modal'])
<form id="create-track" method="POST" action="{{route('admin.composers.store')}}" enctype="multipart/form-data">
	@csrf
	
	@cropper

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	<div class="row">
		@select(['placeholder' => 'Country', 'grid' => 'col', 'name' => 'country_id'])
			@foreach($countries as $letter => $list)
			<optgroup label="{{strtoupper($letter)}}">
				@foreach($list as $country)
				@option(['name' => 'country_id', 'label' => $country->name, 'value' => $country->id, 'selected' => $country->id == old('country_id')])
				@endforeach
			</optgroup>
			@endforeach
		@endselect
		@select(['placeholder' => 'Period', 'grid' => 'col', 'name' => 'period_id'])
			@foreach($periods as $period)
				@option(['name' => 'period_id', 'label' => $period->name, 'value' => $period->id, 'selected' => old('period_id') == $period->id])
			@endforeach
		@endselect
	</div>
	<div class="row"> 
		@input(['placeholder' => 'Born in', 'grid' => 'col', 'name' => 'born_in', 'value' => old('born_in')])
		@input(['placeholder' => 'Died in', 'grid' => 'col', 'name' => 'died_in', 'value' => old('died_in')])
	</div>

    <div id="quill-event-edit" data-name="biography" class="mb-4 form-control">
        {!!old('biography')!!}
    </div>
    <textarea style="display: none" name="biography">{!!old('biography')!!}</textarea>

	@textarea(['placeholder' => 'Curiosity', 'name' => 'curiosity', 'rows' => 2, 'value' => old('curiosity')])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal