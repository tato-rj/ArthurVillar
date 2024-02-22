@modal(['title' => 'Edit book', 'id' => 'edit-book-'.$book->id.'-modal'])
<form id="edit-book" method="POST" action="{{route('listening.books.update', $book)}}" enctype="multipart/form-data">
	@csrf
	@method('PATCH')
	
	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $book->name])

	@input(['label' => 'Series', 'name' => 'series', 'value' => $book->series])

	@label(['label' => 'Cover image'])
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

<div class="text-center pt-3 mt-3" style="border-top: 4px dotted grey">
	@delete(['action' => route('listening.books.destroy', $book), 'label' => 'Delete this book'])
</div>
@endmodal