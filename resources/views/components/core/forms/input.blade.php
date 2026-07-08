<div class="form-group text-left {{$grid ?? null}}">
	@isset($label)
    @label(['icon' => $labelIcon ?? null])
    @endisset

    <div class="form-control form-control-{{$size ?? null}} d-flex align-items-center {{$classes ?? null}} {{isset($mask) && $mask === 'phone' ? 'form-control-phone' : null}}">
    	<div>
    		@isset($icon)
    		@fa(['icon' => $icon, 'fa_color' => $fa_color ?? 'grey-light'])	
    		@endisset
    	</div>
	@isset($mask)
		@if($mask === 'phone')
			@php
				$phoneCountryCodeName = $countryCodeName ?? $name.'_country_code';
				$phoneCountryCode = old($phoneCountryCodeName, $countryCode ?? '+1');
				$phoneCountries = [
					['flag' => '🇺🇸', 'code' => '+1', 'label' => 'United States'],
					['flag' => '🇨🇦', 'code' => '+1', 'label' => 'Canada'],
					['flag' => '🇧🇷', 'code' => '+55', 'label' => 'Brazil'],
					['flag' => '🇬🇧', 'code' => '+44', 'label' => 'United Kingdom'],
					['flag' => '🇦🇺', 'code' => '+61', 'label' => 'Australia'],
					['flag' => '🇫🇷', 'code' => '+33', 'label' => 'France'],
					['flag' => '🇩🇪', 'code' => '+49', 'label' => 'Germany'],
					['flag' => '🇮🇹', 'code' => '+39', 'label' => 'Italy'],
					['flag' => '🇪🇸', 'code' => '+34', 'label' => 'Spain'],
					['flag' => '🇵🇹', 'code' => '+351', 'label' => 'Portugal'],
					['flag' => '🇲🇽', 'code' => '+52', 'label' => 'Mexico'],
					['flag' => '🇦🇷', 'code' => '+54', 'label' => 'Argentina'],
					['flag' => '🇨🇱', 'code' => '+56', 'label' => 'Chile'],
					['flag' => '🇨🇴', 'code' => '+57', 'label' => 'Colombia'],
					['flag' => '🇮🇳', 'code' => '+91', 'label' => 'India'],
					['flag' => '🇯🇵', 'code' => '+81', 'label' => 'Japan'],
					['flag' => '🇰🇷', 'code' => '+82', 'label' => 'South Korea'],
					['flag' => '🇨🇳', 'code' => '+86', 'label' => 'China'],
					['flag' => '🇮🇱', 'code' => '+972', 'label' => 'Israel'],
					['flag' => '🇿🇦', 'code' => '+27', 'label' => 'South Africa'],
				];
			@endphp
			<select class="phone-country-code-select" name="{{$phoneCountryCodeName}}" aria-label="Phone country code" data-phone-country-code>
				@foreach($phoneCountries as $country)
					<option value="{{$country['code']}}" title="{{$country['label']}}" {{iftrue($phoneCountryCode === $country['code'] && ($country['label'] === 'United States' || $phoneCountryCode !== '+1'), 'selected')}}>
						{{$country['flag']}} {{$country['code']}}
					</option>
				@endforeach
			</select>
		@endif
	@endisset
	<input
		class="border-0 w-100 h-100"
		type="{{$type ?? 'text'}}" 
		@isset($mask) data-mask="{{$mask}}"@endisset 
		{{iftrue(isset($mask) && $mask === 'phone', 'inputmode="tel"')}}
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
