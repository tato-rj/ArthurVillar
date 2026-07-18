@modal(['title' => 'Edit waiting list entry', 'id' => 'edit-waiting-list-'.$waitingList->id.'-modal'])
<form method="POST" action="{{route('calendar.waiting-list.update', $waitingList)}}">
	@method('PATCH')
	@csrf

	<div class="row">
		@input(['label' => 'First name', 'name' => 'first_name', 'required' => true, 'value' => $waitingList->first_name, 'grid' => 'col'])
		@input(['label' => 'Last name', 'name' => 'last_name', 'value' => $waitingList->last_name, 'grid' => 'col'])
	</div>

	@input(['label' => 'Parent name', 'name' => 'parent_name', 'value' => $waitingList->parent_name])

	@input(['label' => 'Email', 'name' => 'email', 'value' => $waitingList->email])

	@input(['label' => 'Phone', 'name' => 'phone', 'value' => $waitingList->phone, 'mask' => 'phone'])

	<div class="form-check mb-3">
	  <input class="form-check-input" type="checkbox" value="1" name="is_adult" id="waiting_list_is_adult_{{$waitingList->id}}" {{iftrue($waitingList->is_adult, 'checked')}}>
	  <label class="form-check-label" for="waiting_list_is_adult_{{$waitingList->id}}">
	    Adult student?
	  </label>
	</div>

	<div class="form-group text-left">
		@label(['label' => 'Notes'])
		<textarea class="form-control rounded no-resize" name="notes" rows="5">{{$waitingList->notes}}</textarea>
		@feedback(['input' => 'notes'])
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
