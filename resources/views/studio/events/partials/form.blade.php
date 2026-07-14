@input([
    'label' => 'Name',
    'name' => 'name',
    'required' => true,
    'value' => $event->name ?? old('name'),
])

@input([
    'label' => 'Date',
    'name' => 'scheduled_date',
    'type' => 'date',
    'required' => true,
    'value' => isset($event) && $event->scheduled_date ? $event->scheduled_date->toDateString() : old('scheduled_date'),
])

<div class="row">
    @select(['label' => 'Starts at', 'name' => 'starts_at', 'grid' => 'col', 'required' => true])
        @foreach(\App\Models\Event::timeOptions() as $time)
            @option(['name' => 'starts_at', 'label' => \App\Models\Event::timeLabel($time), 'value' => $time, 'selected' => isset($event) && substr($event->starts_at, 0, 5) === $time])
        @endforeach
    @endselect

    @select(['label' => 'Ends at', 'name' => 'ends_at', 'grid' => 'col', 'required' => true])
        @foreach(\App\Models\Event::timeOptions() as $time)
            @option(['name' => 'ends_at', 'label' => \App\Models\Event::timeLabel($time), 'value' => $time, 'selected' => isset($event) && substr($event->ends_at, 0, 5) === $time])
        @endforeach
    @endselect
</div>

@textarea([
    'label' => 'Notes',
    'name' => 'notes',
    'value' => $event->notes ?? old('notes'),
    'rows' => 5,
])

@submit(['label' => 'Confirm', 'theme' => 'primary'])
