@modal(['title' => 'New event', 'id' => 'create-event-modal'])
<form method="POST" action="{{route('studio.events.store')}}">
    @csrf
    @include('studio.events.partials.form')
</form>
@endmodal
