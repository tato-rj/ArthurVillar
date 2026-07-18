@modal(['title' => 'New recital', 'id' => 'create-recital-modal'])
<form method="POST" action="{{route('calendar.recitals.store')}}">
    @csrf
    @include('calendar.recitals.partials.form')
</form>
@endmodal
