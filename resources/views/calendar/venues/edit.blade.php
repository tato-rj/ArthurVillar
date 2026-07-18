@modal(['title' => 'Edit venue', 'id' => 'edit-venue-'.$venue->id.'-modal'])
<form method="POST" action="{{route('calendar.venues.update', $venue)}}">
    @method('PATCH')
    @csrf
    @include('calendar.venues.partials.form', ['venue' => $venue])
</form>
@endmodal
