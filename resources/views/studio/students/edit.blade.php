@modal(['title' => 'Edit student', 'id' => 'edit-student-'.$student->id.'-modal'])
<form method="POST" action="{{route('studio.students.update', $student)}}">
	@method('PATCH')
	@csrf

	<div class="row"> 
		@input(['label' => 'First name', 'name' => 'first_name', 'required' => true, 'value' => $student->first_name, 'grid' => 'col'])
		@input(['label' => 'Last name', 'name' => 'last_name', 'required' => true, 'value' => $student->last_name, 'grid' => 'col'])
	</div>

	@select(['label' => 'Gender', 'name' => 'gender', 'required' => true])
		@foreach(['female' => 'Female', 'male' => 'Male'] as $value => $genderLabel)
			@option(['name' => 'gender', 'label' => $genderLabel, 'value' => $value, 'selected' => $student->gender === $value])
		@endforeach
	@endselect

	@input(['label' => 'Parent name', 'name' => 'parent_name', 'value' => $student->parent_name])

	@input(['label' => 'Email', 'name' => 'email', 'value' => $student->email, 'required' => true])

	<div class="row"> 
		@input(['label' => 'Phone', 'name' => 'phone', 'value' => $student->phone, 'mask' => 'phone', 'grid' => 'col'])
		@input(['label' => 'Date of birth', 'name' => 'date_of_birth', 'value' => $student->date_of_birth ? \Carbon\Carbon::parse($student->date_of_birth)->format('m/d/Y') : null, 'mask' => 'date', 'grid' => 'col'])
	</div>

	<div class="form-group text-left">
		@label(['label' => 'Notes'])
		<textarea class="form-control rounded no-resize" name="notes" rows="5">{{$student->notes}}</textarea>
		@feedback(['input' => 'notes'])
	</div>

	<div class="form-check">
	  <input class="form-check-input" type="checkbox" value="1" name="is_adult" id="is_adult_{{$student->id}}" {{iftrue($student->is_adult, 'checked')}}>
	  <label class="form-check-label" for="is_adult_{{$student->id}}">
	    Adult student?
	  </label>
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
