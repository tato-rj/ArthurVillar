<button data-bs-toggle="modal" data-bs-target="#edit-method-{{$method->id}}-modal" class="btn-raw w-100 text-left border px-4 py-3">
	<h5>@fa(['icon' => 'book', 'fa_size' => 'sm']){{$method->name}}</h5>
	<p class="m-0 text-muted">{{$method->books_count}} {{str_plural('book', $method->books_count)}}</p>
</button>

@include('listening.methods.edit')