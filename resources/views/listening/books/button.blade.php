<div class="text-center p-2" style="width: 200px; max-width: 50%;">
	<a href="{{route('listening.books.show', compact('book'))}}" class="link-none">
		<img src="{{asset($book->cover_path)}}" class="w-100 mb-2">
		<button class="btn btn-primary btn-sm w-100">{{$book->name}}</button>
	</a>
</div>