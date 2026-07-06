@modal(['title' => 'Edit student', 'id' => 'edit-student-'.$student->id.'-modal'])
<form method="POST" action="{{route('studio.students.update', $student)}}">
	@method('PATCH')
	@csrf

	<div class="row"> 
		@input(['label' => 'First name', 'name' => 'first_name', 'required' => true, 'value' => $student->first_name, 'grid' => 'col'])
		@input(['label' => 'Last name', 'name' => 'last_name', 'required' => true, 'value' => $student->last_name, 'grid' => 'col'])
	</div>

	@input(['label' => 'Parent name', 'name' => 'parent_name', 'value' => $student->parent_name])

	@input(['label' => 'Email', 'name' => 'email', 'value' => $student->email, 'required' => true])

	<div class="row"> 
		@input(['label' => 'Phone', 'name' => 'phone', 'value' => $student->phone, 'mask' => 'phone', 'grid' => 'col'])
		@input(['label' => 'Date of birth', 'name' => 'date_of_birth', 'value' => $student->date_of_birth ? \Carbon\Carbon::parse($student->date_of_birth)->format('m/d/Y') : null, 'mask' => 'date', 'grid' => 'col'])
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
