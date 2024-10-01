@if($composer->country()->exists())

@isset($img)
<img title="{{$composer->country->name}}" width="21.33" height="16" style="border-radius: 4px;" src="{{asset('/images/vendor/flag-icons/flags/4x3/'.$composer->country->iso.'.svg')}}" class="{{$composer->country->css()}}">
@else
<span title="{{$composer->country->name}}" class="fi fi-{{$composer->country->iso}} rounded-sm mr-1 {{$composer->country->css()}}"></span>
@endisset

@endif