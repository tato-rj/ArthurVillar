<div class="mb-1 w-100 position-relative {{$classes ?? null}}" style="
	background-image: url({{asset($book->cover_path)}});
	background-size: cover;
	background-repeat: no-repeat;
	aspect-ratio: 3/4 auto;
	margin-left: {{$ml ?? null}}px
">
	{{$slot ?? null}}
</div>

