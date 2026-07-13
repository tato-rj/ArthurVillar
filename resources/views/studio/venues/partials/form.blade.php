@input([
    'label' => 'Name',
    'name' => 'name',
    'required' => true,
    'value' => $venue->name ?? old('name'),
])

@input([
    'label' => 'Address line 1',
    'name' => 'address_line_1',
    'value' => $venue->address_line_1 ?? old('address_line_1'),
])

@input([
    'label' => 'Address line 2',
    'name' => 'address_line_2',
    'value' => $venue->address_line_2 ?? old('address_line_2'),
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

@submit(['label' => 'Confirm', 'theme' => 'primary'])
