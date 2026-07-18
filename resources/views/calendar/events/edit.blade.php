@modal(['title' => 'Edit event', 'id' => 'edit-event-'.$event->id.'-modal'])
<form method="POST" action="{{route('calendar.events.update', $event)}}">
    @method('PATCH')
    @csrf
    @include('calendar.events.partials.form', ['event' => $event])
</form>
@endmodal
