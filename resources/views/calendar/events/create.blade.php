@modal(['title' => 'New event', 'id' => 'create-event-modal'])
<form method="POST" action="{{route('calendar.events.store')}}">
    @csrf
    @include('calendar.events.partials.form')
    @submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
