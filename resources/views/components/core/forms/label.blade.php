@if($label)
<label class="form-label w-100 mb-1 ml-3 text-nowrap {{$classes ?? null}}">
	<small>
	@isset($icon)
	@icon($icon)
	@endisset
	{{$label}}
	@isset($required)
	<span class="text-red">*</span>
	@endisset

	@isset($tippy)
	@icon('info', ['mr' => 0, 'ml' => 1, 'classes' => 'text-primary cursor-pointer', 'data-toggle' => 'tippy', 'data-tippy-content' => $tippy])
	@endisset
	</small>
</label>
@endif