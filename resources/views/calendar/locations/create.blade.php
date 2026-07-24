@modal(['title' => 'New location', 'id' => 'create-location-modal'])
<form method="POST" action="{{route('calendar.locations.store')}}">
	@csrf

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	@select(['placeholder' => 'Usage', 'name' => 'usage', 'required' => true])
		<option selected value="">General use</option>
		@foreach(\App\Models\Calendar\Location::usages() as $usage)
			@option([
				'name' => 'usage',
				'label' => ucfirst($usage),
				'value' => $usage,
				'selected' => old('usage', \App\Models\Calendar\Location::USAGE_GENERAL) === $usage
			])
		@endforeach
	@endselect

	@input(['placeholder' => 'Street address', 'name' => 'address', 'value' => old('address')])

	<div class="row">
		@input(['placeholder' => 'City', 'name' => 'city', 'value' => old('city'), 'grid' => 'col'])
		@input(['placeholder' => 'State', 'name' => 'state', 'value' => old('state'), 'grid' => 'col'])
	</div>

	@input(['placeholder' => 'Postal code', 'name' => 'postal_code', 'value' => old('postal_code')])

	@input([
		'placeholder' => 'Hourly fee',
		'name' => 'fee_amount',
		'value' => old('fee_amount'),
		'mask' => 'usd',
		'info' => 'Hourly rate used to calculate the fee for recurring lessons.'
	])

	@input([
		'placeholder' => 'Tax withheld',
		'name' => 'tax_withheld_percentage',
		'value' => old('tax_withheld_percentage', 0),
		'type' => 'number',
		'min' => 0,
		'max' => 100,
		'step' => '0.01',
		'info' => 'Percentage withheld from confirmed lesson payments.'
	])

	<div class="form-check mb-3">
	  <input class="form-check-input" type="checkbox" value="1" name="is_active" id="location_is_active" checked>
	  <label class="form-check-label" for="location_is_active">
	    Active location?
	  </label>
	</div>

	@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => old('notes'), 'rows' => 4])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
