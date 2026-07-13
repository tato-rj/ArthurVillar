@modal(['title' => 'Edit venue', 'id' => 'edit-venue-'.$venue->id.'-modal'])
<form method="POST" action="{{route('studio.venues.update', $venue)}}">
    @method('PATCH')
    @csrf
    @include('studio.venues.partials.form', ['venue' => $venue])
</form>
@endmodal
