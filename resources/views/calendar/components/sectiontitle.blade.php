<label 
	class="small fw-bold opacity-6 mb-3"
	@isset($attr)
	@foreach($attr as $key => $value)
	{{$key}}="{{$value}}"
	@endforeach
	@endisset
>@icon($icon){{$label}}</label>