@modal(['title' => 'New venue', 'id' => 'create-venue-modal'])
<form method="POST" action="{{route('studio.venues.store')}}">
    @csrf
    @include('studio.venues.partials.form')
</form>
@endmodal
