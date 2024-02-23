@modal(['title' => 'New method', 'id' => 'create-method-modal'])
<form id="create-method" method="POST" action="{{route('listening.methods.store')}}">
	@csrf
	
	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal