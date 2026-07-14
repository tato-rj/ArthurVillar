@modal(['title' => 'Edit event', 'id' => 'edit-event-'.$event->id.'-modal'])
<form method="POST" action="{{route('studio.events.update', $event)}}">
    @method('PATCH')
    @csrf
    @include('studio.events.partials.form', ['event' => $event])
</form>
@endmodal
