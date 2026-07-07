<option value="{{$value}}" 
		@isset($data)
		@foreach($data as $key => $dataValue)
		data-{{$key}}="{{$dataValue}}"
		@endforeach
		@endisset
		@if(old($name) == $value)
		selected
		@else
		{{iftrue($selected ?? null, 'selected')}}
		@endif
	>
	{{$label}}
</option>
