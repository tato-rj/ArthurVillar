@modal(['title' => 'Edit method', 'id' => 'edit-method-'.$method->id.'-modal'])
<form id="edit-method" method="POST" action="{{route('listening.methods.update', $method)}}">
	@csrf
	@method('PATCH')
	
	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $method->name])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>

<div class="text-center pt-3 mt-3" style="border-top: 4px dotted grey">
	@delete(['action' => route('listening.methods.destroy', $method), 'label' => 'Delete this method'])
</div>
@endmodal