<form method="POST" action="{{$action}}" confirm>
  @csrf
  @method('DELETE')
  <button type="submit" class="btn btn-sm btn-raw text-danger">
    @fa([
      'icon' => 'trash-alt',
      'mr' => isset($label) ? '2' : 0
    ]){{$label ?? null}}
  </button>
</form>