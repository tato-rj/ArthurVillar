@modal(['title' => 'Edit location', 'id' => 'edit-location-'.$location->id.'-modal'])
<form method="POST" action="{{route('calendar.locations.update', $location)}}">
	@method('PATCH')
	@csrf

	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name', $location->name)])

	@select(['label' => 'Usage', 'name' => 'usage', 'required' => true])
		<option value="">General use</option>
		@foreach(\App\Models\Calendar\Location::usages() as $usage)
			@option([
				'name' => 'usage',
				'label' => ucfirst($usage),
				'value' => $usage,
				'selected' => old('usage', $location->usage) === $usage
			])
		@endforeach
	@endselect

	@input(['label' => 'Street address', 'name' => 'address', 'value' => old('address', $location->address)])

	<div class="row">
		@input(['label' => 'City', 'name' => 'city', 'value' => old('city', $location->city), 'grid' => 'col'])
		@input(['label' => 'State', 'name' => 'state', 'value' => old('state', $location->state), 'grid' => 'col'])
	</div>

	@input(['label' => 'Postal code', 'name' => 'postal_code', 'value' => old('postal_code', $location->postal_code)])

	@input([
		'label' => 'Hourly fee',
		'name' => 'fee_amount',
		'value' => old('fee_amount', $location->feeAmountForInput()),
		'mask' => 'usd',
		'info' => 'Hourly rate used to calculate the fees for recurring lessons.'
	])

	@input([
		'label' => 'Tax withheld',
		'name' => 'tax_withheld_percentage',
		'value' => old('tax_withheld_percentage', $location->tax_withheld_percentage),
		'type' => 'number',
		'min' => 0,
		'max' => 100,
		'step' => '0.01',
		'info' => 'Percentage withheld from confirmed lesson payments.'
	])

	<div class="form-check mb-3">
	  <input class="form-check-input" type="checkbox" value="1" name="is_active" id="location_is_active_{{$location->id}}" {{iftrue(old('is_active', $location->is_active), 'checked')}}>
	  <label class="form-check-label" for="location_is_active_{{$location->id}}">
	    Active location?
	  </label>
	</div>

	@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => old('notes', $location->notes), 'rows' => 4])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
