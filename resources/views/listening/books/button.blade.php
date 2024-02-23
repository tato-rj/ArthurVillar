<div class="text-center p-2" style="width: 200px; max-width: 50%;">
	<a href="{{route('listening.books.show', compact('book'))}}" class="link-none">
		@component('components.books.cover', compact('book'))
		<div class="position-absolute bottom-0 left-0 p-2 w-100 text-truncate">
			<button class="btn btn-primary btn-sm w-100 text-nowrap text-truncate">{{$book->name}}</button>
		</div>
		@endcomponent

		<label class="small text-muted">{{$book->tracks_count}} {{str_plural('piece', $book->tracks_count)}}</label>
	</a>
</div>