<form method="POST" action="{{$action}}" confirm>
  @csrf
  @method('DELETE')
  <button type="submit" class="btn btn-sm btn-raw text-danger">
    @icon('trash-2', ['mr' => isset($label) ? '2' : 0]){{$label ?? null}}
  </button>
</form>