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
		@foreach(['female' => 'Female', 'male' => 'Male'] as $value => $label)
			@option(['name' => 'gender', 'label' => $label, 'value' => $value, 'selected' => old('gender') === $value])
		@endforeach
	@endselect

	@input(['placeholder' => 'Parent name', 'name' => 'parent_name', 'value' => old('parent_name')])

	@input(['placeholder' => 'Email', 'name' => 'email', 'value' => old('email'), 'required' => true])

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
