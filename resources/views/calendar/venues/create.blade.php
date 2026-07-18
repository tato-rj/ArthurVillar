@modal(['title' => 'New venue', 'id' => 'create-venue-modal'])
<form method="POST" action="{{route('calendar.venues.store')}}">
    @csrf
    @include('calendar.venues.partials.form')
</form>
@endmodal
