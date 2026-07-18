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

@select(['placeholder' => 'Venue (optional)', 'name' => 'venue_id'])
    @option(['name' => 'venue_id', 'label' => 'No venue specified', 'value' => '', 'selected' => empty($recital->venue_id)])
    @foreach($venues as $venue)
        @option([
            'name' => 'venue_id',
            'label' => $venue->name,
            'value' => $venue->id,
            'selected' => isset($recital) && $recital->venue_id == $venue->id,
        ])
    @endforeach
@endselect

@submit(['label' => 'Confirm', 'theme' => 'primary'])
