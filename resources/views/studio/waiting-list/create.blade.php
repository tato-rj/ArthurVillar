@modal(['title' => 'New waiting list entry', 'id' => 'create-waiting-list-modal'])
<form method="POST" action="{{route('studio.waiting-list.store')}}">
	@csrf

	<div class="row">
		@input(['placeholder' => 'First name', 'name' => 'first_name', 'required' => true, 'value' => old('first_name'), 'grid' => 'col'])
		@input(['placeholder' => 'Last name', 'name' => 'last_name', 'value' => old('last_name'), 'grid' => 'col'])
	</div>

	@input(['placeholder' => 'Parent name', 'name' => 'parent_name', 'value' => old('parent_name')])

	@input(['placeholder' => 'Email', 'name' => 'email', 'value' => old('email')])

	@input(['placeholder' => 'Phone', 'name' => 'phone', 'value' => old('phone'), 'mask' => 'phone'])

	<div class="form-check mb-3">
	  <input class="form-check-input" type="checkbox" value="1" name="is_adult" id="waiting_list_is_adult" {{iftrue(old('is_adult'), 'checked')}}>
	  <label class="form-check-label" for="waiting_list_is_adult">
	    Adult student?
	  </label>
	</div>

	<div class="form-group text-left">
		@label(['label' => 'Notes'])
		<textarea class="form-control rounded no-resize" name="notes" rows="5">{{old('notes')}}</textarea>
		@feedback(['input' => 'notes'])
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
