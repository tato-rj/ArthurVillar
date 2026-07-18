@modal(['title' => 'Edit location', 'id' => 'edit-location-'.$location->id.'-modal'])
<form method="POST" action="{{route('calendar.locations.update', $location)}}">
	@method('PATCH')
	@csrf

	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $location->name])

	@input([
		'label' => 'Hourly fee',
		'name' => 'fee_amount',
		'value' => $location->feeAmountForInput(),
		'mask' => 'usd',
		'info' => 'Hourly rate used to calculate the fees for recurring lessons.'
	])

	@input([
		'label' => 'Tax withheld',
		'name' => 'tax_withheld_percentage',
		'value' => $location->tax_withheld_percentage,
		'type' => 'number',
		'min' => 0,
		'max' => 100,
		'step' => '0.01',
		'info' => 'Percentage withheld from confirmed lesson payments.'
	])

	<div class="form-check mb-3">
	  <input class="form-check-input" type="checkbox" value="1" name="is_active" id="location_is_active_{{$location->id}}" {{iftrue($location->is_active, 'checked')}}>
	  <label class="form-check-label" for="location_is_active_{{$location->id}}">
	    Active location?
	  </label>
	</div>

	@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => $location->notes, 'rows' => 4])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
