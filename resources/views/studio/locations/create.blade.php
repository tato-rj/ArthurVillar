@modal(['title' => 'New location', 'id' => 'create-location-modal'])
<form method="POST" action="{{route('studio.locations.store')}}">
	@csrf

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	@input([
		'placeholder' => 'Tax withheld',
		'name' => 'tax_withheld_percentage',
		'value' => old('tax_withheld_percentage', 0),
		'type' => 'number',
		'min' => 0,
		'max' => 100,
		'step' => '0.01',
		'info' => 'Percentage withheld from confirmed lesson payments at this location.'
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
