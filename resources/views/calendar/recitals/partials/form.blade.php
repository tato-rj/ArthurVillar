@input([
    'label' => 'Name',
    'name' => 'name',
    'required' => true,
    'value' => $recital->name ?? old('name'),
])

<div class="row">
    @input([
        'label' => 'Date',
        'name' => 'date',
        'type' => 'date',
        'grid' => 'col',
        'required' => true,
        'value' => isset($recital) && $recital->date ? $recital->date->toDateString() : old('date'),
    ])

    @select(['label' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
        @foreach(\App\Models\Calendar\Event::timeOptions() as $time)
            @option(['name' => 'start_time', 'label' => \App\Models\Calendar\Event::timeLabel($time), 'value' => $time, 'selected' => isset($recital) && substr($recital->start_time, 0, 5) === $time])
        @endforeach
    @endselect
</div>

@select(['placeholder' => 'Location (optional)', 'name' => 'location_id'])
    @option(['name' => 'location_id', 'label' => 'No location specified', 'value' => '', 'selected' => empty($recital->location_id)])
    @foreach($locations as $location)
        @option([
            'name' => 'location_id',
            'label' => $location->name,
            'value' => $location->id,
            'selected' => old('location_id', $recital->location_id ?? null) == $location->id,
        ])
    @endforeach
@endselect

@submit(['label' => 'Confirm', 'theme' => 'primary'])
