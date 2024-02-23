@modal(['title' => 'New book', 'id' => 'create-book-modal'])
<form id="create-book" method="POST" action="{{route('listening.books.store')}}" enctype="multipart/form-data">
	@csrf
	
	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])
	
	<div class="autocomplete w-100"> 
		@input(['id' => 'method-input', 'placeholder' => 'Method', 'name' => 'method', 'value' => old('method')])
	</div>

	<label class="input-file cursor-pointer w-100 form-group">
		<input style="display: none" name="cover" data-accept="jpg" type="file">
		<div class="form-control">
			<span class="filename"></span>
			<span class="default">
				@fa(['icon' => 'cloud-arrow-up'])<small>Select Image</small>
			</span>
		</div>
	</label>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal