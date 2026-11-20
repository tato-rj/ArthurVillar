<div class="text-nowrap">
	{{ $slot ?? null }}

	@isset($edit)
		@isset($edit['modal'])
		<button data-bs-toggle="modal" data-bs-target="{{$edit['modal']}}" class="btn btn-sm btn-warning rounded">@icon('square-pen', ['mr' => 0])</button>
		@else
		<a href="{{$edit['href']}}" class="btn btn-sm btn-warning rounded">@icon('square-pen', ['mr' => 0])</a>
		@endisset
	@endisset

	@isset($delete)
	<form method="POST" action="{{$delete['href']}}" class=" d-inline-block" confirm>
		@csrf
		@method('DELETE')
		<button type="submit" class="btn btn-sm btn-red rounded">@icon('trash-2', ['mr' => 0])</button>
	</form>
	@endisset
</div>