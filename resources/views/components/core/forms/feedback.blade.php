<div class="valid-feedback">
  Looks good!
</div>

@isset($errors)
<div class="invalid-feedback {{$errors->has($input) ? 'd-block' : null}}">
  @error($input)
  @icon('circle-alert', ['mr' => 1]){{$message}}
  @enderror
</div>
@endisset