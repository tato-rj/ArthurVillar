@input([
    'label' => 'Name',
    'name' => 'name',
    'required' => true,
    'value' => $venue->name ?? old('name'),
])

@input([
    'label' => 'Address',
    'name' => 'address',
    'value' => $venue->address ?? old('address'),
])

<div class="row">
    @input([
        'label' => 'City',
        'name' => 'city',
        'grid' => 'col',
        'value' => $venue->city ?? old('city'),
    ])

    @input([
        'label' => 'State',
        'name' => 'state',
        'grid' => 'col',
        'value' => $venue->state ?? old('state'),
    ])
</div>

@input([
    'label' => 'Postal code',
    'name' => 'postal_code',
    'value' => $venue->postal_code ?? old('postal_code'),
])

@input([
    'label' => 'Map URL',
    'name' => 'map_url',
    'type' => 'url',
    'value' => $venue->map_url ?? old('map_url'),
])

@submit(['label' => 'Confirm', 'theme' => 'primary'])
