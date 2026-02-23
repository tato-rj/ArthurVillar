@php($composer = $row)
@switch((new \Table)->getFieldname($field))
  @case('name')
    <span style="width: 12px; height: 12px;" class="mr-2 d-inline-block rounded-circle bg-{{$composer->period->color}}"></span>{{$composer->name}}
    @break
  
  @case('country.name')
    {{$composer->country->name}}
    @break

  @case('period')
    {{$composer->period->name}}
    @break

  @case('actions')
      @include('components.table.actions', [
        'edit' => ['href' => route('admin.composers.edit', $composer)],
      ])
      @break
@endswitch