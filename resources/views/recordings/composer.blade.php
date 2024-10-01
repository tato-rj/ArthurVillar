@modal(['title' => 'About the composer', 'id' => 'recording-'.$recording->id.'-info-modal'])
{{-- <p class="m-0" style="white-space: pre-wrap;">{{$recording->description}}</p> --}}

<div class="d-flex align-items-center mb-3">
	<img src="{{$recording->composer->storage('cover_path')}}" class="rounded-circle mr-3 shadow-lg" style="width: 80px">
	<div>
		<p class="m-0 small">@flag(['composer' => $recording->composer]){{$recording->composer->country->name ?? null}}</p>
		<h4 class="m-0">{{$recording->composer->name}}</h4>
		<p class="m-0 small opacity-6">{{$recording->composer->born_in->year}} - {{$recording->composer->died_in->year}}</p>
	</div>
</div>

<div class="mb-3 p-3 border bg-light"><strong>Did you know?</strong> {{$recording->composer->curiosity}}</div>

<p class="m-0" style="white-space: pre-wrap;">{{$recording->composer->biography}}</p>
@endmodal