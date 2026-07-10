@modal(['title' => 'New student', 'id' => 'create-student-modal'])
<form method="POST" action="{{route('studio.students.store')}}">
	@csrf
	<input type="hidden" name="waiting_list_id" value="{{old('waiting_list_id')}}">
	<input type="hidden" name="notes" value="{{old('notes')}}">

	<div class="row"> 
		@input(['placeholder' => 'First name', 'name' => 'first_name', 'required' => true, 'value' => old('first_name'), 'grid' => 'col'])
		@input(['placeholder' => 'Last name', 'name' => 'last_name', 'required' => true, 'value' => old('last_name'), 'grid' => 'col'])
	</div>

	@select(['placeholder' => 'Gender', 'name' => 'gender', 'required' => true])
		@foreach(['female' => 'Female', 'male' => 'Male'] as $value => $genderLabel)
			@option(['name' => 'gender', 'label' => $genderLabel, 'value' => $value, 'selected' => old('gender') === $value])
		@endforeach
	@endselect

	@input(['placeholder' => 'Parent name', 'name' => 'parent_name', 'value' => old('parent_name')])

	@input(['placeholder' => 'Email', 'name' => 'email', 'value' => old('email'), 'required' => true])

	@select(['placeholder' => 'Default location', 'name' => 'location_id'])
		@foreach($locations ?? [] as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => old('location_id') == $location->id])
		@endforeach
	@endselect

	@select(['placeholder' => 'Default payment method', 'name' => 'payment_method'])
		@foreach(payment()->methods() as $method)
			@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => old('payment_method') == $method])
		@endforeach
	@endselect

	<div class="row"> 
		@input(['placeholder' => 'Phone', 'name' => 'phone', 'value' => old('phone'), 'mask' => 'phone', 'grid' => 'col'])
		@input(['placeholder' => 'Date of birth', 'name' => 'date_of_birth', 'value' => old('date_of_birth'), 'mask' => 'date', 'grid' => 'col'])
	</div>

	<div class="form-group text-left">
		@label(['label' => 'Notes'])
		<textarea class="form-control rounded no-resize" name="notes" rows="5">{{old('notes')}}</textarea>
		@feedback(['input' => 'notes'])
	</div>
	
	<div class="form-check">
	  <input class="form-check-input" type="checkbox" value="{{old('is_adult')}}" name="is_adult" id="is_adult">
	  <label class="form-check-label" for="is_adult">
	    Adult student?
	  </label>
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
