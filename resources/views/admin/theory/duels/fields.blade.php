<dl class="duel-value-fields {{ ($nested ?? false) ? 'duel-value-fields--nested' : '' }}">
    @foreach($fields as $field)
        <div class="duel-value-field">
            <dt>{{ $field['label'] }}</dt>
            <dd>
                @if($field['children'])
                    @include('admin.theory.duels.fields', ['fields' => $field['children'], 'nested' => true])
                @elseif($field['items'])
                    <ul class="duel-value-list" aria-label="{{ $field['label'] }}">
                        @foreach($field['items'] as $item)<li>{{ $item }}</li>@endforeach
                    </ul>
                @else
                    <span @class(['duel-value', 'duel-value--yes' => $field['value'] === 'Yes', 'duel-value--no' => $field['value'] === 'No'])>{{ $field['value'] }}</span>
                @endif
            </dd>
        </div>
    @endforeach
</dl>
