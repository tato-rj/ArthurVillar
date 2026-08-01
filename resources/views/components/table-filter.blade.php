<div class="calendar-date-range dropdown" @isset($id) id="{{$id}}" @endisset>
    <button
        type="button"
        class="calendar-date-range-toggle"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false">
        @fa(['icon' => 'filter', 'mr' => 0])
        <span>{{$placeholder ?? 'Filter rows'}}</span>
        @fa(['icon' => 'angle-down', 'mr' => 0])
    </button>

    <div class="dropdown-menu p-3">
        @foreach($groups ?? [] as $groupLabel => $options)
            <div class="small fw-bold opacity-4 {{$loop->first ? '' : 'mt-3 '}}mb-2">
                {{strtoupper($groupLabel)}}
            </div>

            @foreach($options as $option)
                @php
                    $inputAttributes = new \Illuminate\View\ComponentAttributeBag(array_merge([
                        'class' => 'form-check-input',
                        'type' => 'checkbox',
                        'value' => $option['value'],
                        'id' => $option['id'],
                    ], $option['attributes'] ?? []));
                @endphp

                <div class="form-check">
                    <input {{$inputAttributes}} @checked($option['checked'] ?? false)>
                    <label class="form-check-label" for="{{$option['id']}}">{{$option['label']}}</label>
                </div>
            @endforeach
        @endforeach
    </div>
</div>
