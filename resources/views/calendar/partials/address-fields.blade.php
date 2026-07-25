@php
    $addressable = $addressable ?? null;
    $address = old('address', $addressable->address ?? null);
    $city = old('city', $addressable->city ?? null);
    $state = old('state', $addressable->state ?? null);
    $postalCode = old('postal_code', $addressable->postal_code ?? null);
    $state = array_key_exists((string) $state, config('us_states'))
        ? $state
        : array_search($state, config('us_states'), true);
@endphp

<div
    data-address-fields
    data-address-search-url="{{route('calendar.address-autocomplete.search')}}"
    data-address-details-url="{{route('calendar.address-autocomplete.details')}}">
    @input([
        'label' => 'Street address (optional)',
        'name' => 'address',
        'value' => $address,
        'autocomplete' => 'street-address',
    ])

    <div class="row">
        @input([
            'label' => 'City',
            'name' => 'city',
            'grid' => 'col',
            'value' => $city,
            'autocomplete' => 'address-level2',
        ])

        @select([
            'label' => 'State',
            'name' => 'state',
            'grid' => 'col',
            'autocomplete' => 'address-level1',
        ])
            <option value=""></option>
            @foreach(config('us_states') as $stateCode => $stateName)
                @option([
                    'name' => 'state',
                    'label' => $stateName,
                    'value' => $stateCode,
                    'selected' => $state === $stateCode,
                ])
            @endforeach
        @endselect
    </div>

    @input([
        'label' => 'Postal code',
        'name' => 'postal_code',
        'value' => $postalCode,
        'autocomplete' => 'postal-code',
    ])
</div>
