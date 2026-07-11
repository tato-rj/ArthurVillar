<div class="form-group text-left {{$grid ?? null}}">
	@php($inputLabel = $label ?? (($type ?? 'text') === 'date' ? ($placeholder ?? null) : null))

	@if($inputLabel)
    @label(['label' => $inputLabel, 'icon' => $labelIcon ?? null])
    @endif

    <div class="form-control form-control-{{$size ?? null}} d-flex align-items-center {{$classes ?? null}}">
    	<div>
    		@isset($icon)
    		@fa(['icon' => $icon, 'fa_color' => $fa_color ?? 'grey-light'])	
    		@endisset
    	</div>
	<input
		class="border-0 w-100 h-100"
		type="{{$type ?? 'text'}}" 
		@isset($mask) data-mask="{{$mask}}"@endisset 
		@isset($min) min="{{$min}}"@endisset 
		@isset($max) max="{{$max}}"@endisset 
		@isset($step) step="{{$step}}"@endisset 
		placeholder="{{$placeholder ?? null}}" 
		name="{{$name}}"
		
		@if(old($name))
		value="{{old($name)}}"
		@else
		value="{{$value ?? null}}"
		@endif

		{{-- autocomplete="off" --}}

		@isset($id)id="{{$id}}"@endisset

		{{iftrue($disabled ?? null, 'disabled')}}
		{{iftrue($required ?? null, 'required data-required')}}
		{{iftrue($readonly ?? null, 'readonly')}}>
	</div>
	
	@isset($info)
	<div class="form-text">{{$info}}</div>
	@endisset

	@feedback(['input' => $name])
</div>
