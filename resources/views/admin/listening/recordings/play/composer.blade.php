@modal(['title' => 'About the composer', 'id' => 'recording-'.$recording->id.'-composer-modal'])
<div class="d-flex align-items-center mb-3">
	<img src="{{$recording->composer->storage('cover_path')}}" class="rounded-circle mr-3 shadow-lg" style="width: 80px">
	<div>
		<p class="m-0 small">@flag(['composer' => $recording->composer]){{$recording->composer->country->name ?? null}}</p>
		<h4 class="m-0">{{$recording->composer->name}}</h4>
		<p class="m-0 small opacity-6">{{$recording->composer->born_in->year}} - {{$recording->composer->died_in->year}}</p>
	</div>
</div>

<p id="bio" class="m-0" style="white-space: pre-wrap;">{!!$recording->composer->biography!!}</p>

<div class="mt-4 pt-3" style="border-top: lightgrey 6px dotted">
	<h6 class="fw-bold text-center">Did you know?</h6>
	<div class="bg-light p-3">{{$recording->composer->curiosity}}</div>
</div>
@endmodal